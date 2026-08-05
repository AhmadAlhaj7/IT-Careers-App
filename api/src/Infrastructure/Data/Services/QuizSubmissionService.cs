using ItCareers.Application.Quizzes;
using ItCareers.Application.Roadmaps;
using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Services;

public class QuizSubmissionService : IQuizSubmissionService
{
    // "Learning over gatekeeping": unlimited retries, no cooldown, a lenient but real bar.
    private const double PassThreshold = 0.7;

    private readonly ItCareersDbContext _context;
    private readonly IRoadmapQueries _roadmapQueries;

    public QuizSubmissionService(ItCareersDbContext context, IRoadmapQueries roadmapQueries)
    {
        _context = context;
        _roadmapQueries = roadmapQueries;
    }

    public async Task<QuizSubmissionOutcome> SubmitAsync(
        string userId,
        string roadmapSlug,
        int orderIndex,
        QuizSubmissionRequest submission,
        CancellationToken cancellationToken = default)
    {
        // Delegates to the exact same access check the read endpoint uses — one place decides
        // "can this user see this phase," so submitting a quiz you haven't unlocked can't
        // drift out of sync with what the phase-content endpoint itself enforces.
        var access = await _roadmapQueries.GetPhaseAsync(roadmapSlug, orderIndex, userId, cancellationToken);

        if (access.Status == PhaseAccessStatus.NotFound)
        {
            return new QuizSubmissionOutcome(QuizSubmissionStatus.NotFound, null);
        }

        if (access.Status == PhaseAccessStatus.Locked)
        {
            return new QuizSubmissionOutcome(QuizSubmissionStatus.Locked, null);
        }

        var phase = await _context.Phases
            .Include(p => p.QuizQuestions)
            .FirstOrDefaultAsync(
                p => p.Roadmap!.Slug == roadmapSlug && p.OrderIndex == orderIndex && !p.IsDeleted,
                cancellationToken);

        if (phase is null)
        {
            return new QuizSubmissionOutcome(QuizSubmissionStatus.NotFound, null);
        }

        var questions = phase.QuizQuestions.Where(q => !q.IsDeleted).ToList();
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

        if (passed)
        {
            var alreadyCompleted = await _context.PhaseCompletions
                .AnyAsync(c => c.UserId == userId && c.PhaseId == phase.Id, cancellationToken);

            if (!alreadyCompleted)
            {
                _context.PhaseCompletions.Add(new PhaseCompletion(Guid.NewGuid(), userId, phase.Id, DateTimeOffset.UtcNow));

                try
                {
                    await _context.SaveChangesAsync(cancellationToken);
                }
                catch (DbUpdateException)
                {
                    // A concurrent submission already recorded the completion — fine either way.
                }
            }
        }

        return new QuizSubmissionOutcome(QuizSubmissionStatus.Graded, new QuizResultDto(correctCount, totalCount, passed));
    }
}
