using ItCareers.Application.CareerQuiz;
using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Services;

public class CareerQuizSubmissionService : ICareerQuizSubmissionService
{
    // Spec requires simple, transparent, rule-based weighted scoring — never an LLM call.
    private const int RecommendationCount = 2;

    private readonly ItCareersDbContext _context;

    public CareerQuizSubmissionService(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<CareerQuizResultDto?> SubmitAsync(
        string? userId,
        CareerQuizSubmissionRequest request,
        CancellationToken cancellationToken = default)
    {
        var questions = await _context.CareerQuizQuestions
            .Where(q => !q.IsDeleted)
            .ToListAsync(cancellationToken);

        var tracks = await _context.Tracks
            .Where(t => t.Published && !t.IsDeleted)
            .ToListAsync(cancellationToken);

        if (questions.Count == 0 || tracks.Count == 0)
        {
            return null;
        }

        var questionsById = questions.ToDictionary(q => q.Id);
        var scores = tracks.ToDictionary(t => t.Id, _ => 0);

        foreach (var answer in request.Answers)
        {
            if (!questionsById.TryGetValue(answer.QuestionId, out var question))
            {
                continue;
            }

            if (answer.SelectedOptionIndex < 0 || answer.SelectedOptionIndex >= question.Options.Count)
            {
                continue;
            }

            var option = question.Options[answer.SelectedOptionIndex];
            foreach (var weight in option.TrackWeights)
            {
                if (scores.ContainsKey(weight.TrackId))
                {
                    scores[weight.TrackId] += weight.Weight;
                }
            }
        }

        var ranked = tracks
            .Select(t => new { Track = t, Score = scores[t.Id] })
            .OrderByDescending(x => x.Score)
            .ToList();

        var recommendedTrackId = ranked[0].Track.Id;

        _context.CareerQuizSubmissions.Add(
            new CareerQuizSubmission(
                Guid.NewGuid(),
                userId,
                request.Email,
                recommendedTrackId,
                request.Answers.Select(a => new CareerQuizAnswer(a.QuestionId, a.SelectedOptionIndex)),
                DateTimeOffset.UtcNow));
        await _context.SaveChangesAsync(cancellationToken);

        var recommendations = ranked
            .Take(RecommendationCount)
            .Select(x => new TrackRecommendationDto(x.Track.Slug, x.Track.Name, x.Score))
            .ToList();

        return new CareerQuizResultDto(recommendations);
    }
}
