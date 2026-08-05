using ItCareers.Application.Quizzes;
using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Services;

public class FinalExamSubmissionService : IFinalExamSubmissionService
{
    private const double PassThreshold = 0.7;

    private readonly ItCareersDbContext _context;

    public FinalExamSubmissionService(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<FinalExamSubmissionOutcome> SubmitAsync(
        string userId,
        string learnerName,
        string roadmapSlug,
        QuizSubmissionRequest submission,
        CancellationToken cancellationToken = default)
    {
        var roadmap = await _context.Roadmaps
            .Include(r => r.FinalExamQuestions)
            .FirstOrDefaultAsync(r => r.Slug == roadmapSlug && !r.IsDeleted, cancellationToken);

        if (roadmap is null)
        {
            return new FinalExamSubmissionOutcome(FinalExamSubmissionStatus.NotFound, null);
        }

        var isEnrolled = await _context.Enrollments
            .AnyAsync(e => e.UserId == userId && e.RoadmapId == roadmap.Id, cancellationToken);

        if (!isEnrolled)
        {
            return new FinalExamSubmissionOutcome(FinalExamSubmissionStatus.NotEnrolled, null);
        }

        var questions = roadmap.FinalExamQuestions.Where(q => !q.IsDeleted).ToList();
        var answersByQuestion = submission.Answers.ToDictionary(a => a.QuestionId, a => a.SelectedOptionIndex);

        var correctCount = 0;
        foreach (var question in questions)
        {
            if (!answersByQuestion.TryGetValue(question.Id, out var selectedIndex))
            {
                continue;
            }

            if (selectedIndex >= 0 && selectedIndex < question.Options.Count && question.Options[selectedIndex].IsCorrect)
            {
                correctCount++;
            }
        }

        var totalCount = questions.Count;
        var passed = totalCount > 0 && (double)correctCount / totalCount >= PassThreshold;

        // Every attempt is kept, not just the passing one — a deliberate difference from
        // PhaseCompletion, matching the spec's FINAL_EXAM_ATTEMPT history.
        _context.FinalExamAttempts.Add(
            new FinalExamAttempt(Guid.NewGuid(), userId, roadmap.Id, correctCount, totalCount, passed, DateTimeOffset.UtcNow));
        await _context.SaveChangesAsync(cancellationToken);

        string? certificateCode = null;
        if (passed)
        {
            certificateCode = await IssueOrReuseCertificateAsync(userId, learnerName, roadmap.Id, cancellationToken);
        }

        return new FinalExamSubmissionOutcome(
            FinalExamSubmissionStatus.Graded,
            new FinalExamResultDto(correctCount, totalCount, passed, certificateCode));
    }

    private async Task<string> IssueOrReuseCertificateAsync(
        string userId,
        string learnerName,
        Guid roadmapId,
        CancellationToken cancellationToken)
    {
        var existing = await _context.Certificates
            .FirstOrDefaultAsync(c => c.UserId == userId && c.RoadmapId == roadmapId, cancellationToken);

        if (existing is not null)
        {
            return existing.VerificationCode;
        }

        var code = Guid.NewGuid().ToString("N")[..12];
        var certificate = new Certificate(Guid.NewGuid(), userId, roadmapId, learnerName, code, DateTimeOffset.UtcNow);
        _context.Certificates.Add(certificate);

        try
        {
            await _context.SaveChangesAsync(cancellationToken);
            return code;
        }
        catch (DbUpdateException)
        {
            // A concurrent passing attempt already issued one — the unique (UserId,
            // RoadmapId) index caught it, fetch what actually got created.
            var raceWinner = await _context.Certificates
                .FirstAsync(c => c.UserId == userId && c.RoadmapId == roadmapId, cancellationToken);
            return raceWinner.VerificationCode;
        }
    }
}
