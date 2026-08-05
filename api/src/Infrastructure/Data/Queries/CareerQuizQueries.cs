using ItCareers.Application.CareerQuiz;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Queries;

public class CareerQuizQueries : ICareerQuizQueries
{
    private readonly ItCareersDbContext _context;

    public CareerQuizQueries(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<PublicCareerQuizQuestionDto>> ListQuestionsAsync(CancellationToken cancellationToken = default)
    {
        var questions = await _context.CareerQuizQuestions
            .AsNoTracking()
            .Where(q => !q.IsDeleted)
            .OrderBy(q => q.OrderIndex)
            .ToListAsync(cancellationToken);

        // TrackWeights deliberately never selected here — same principle as hiding IsCorrect
        // on the phase/final-exam quizzes.
        return questions
            .Select(q => new PublicCareerQuizQuestionDto(
                q.Id,
                q.Text,
                q.Options.Select((o, index) => new PublicCareerQuizOptionDto(index, o.Text)).ToList()))
            .ToList();
    }
}
