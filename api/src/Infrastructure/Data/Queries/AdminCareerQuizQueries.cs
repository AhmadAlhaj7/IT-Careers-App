using ItCareers.Application.CareerQuiz;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Queries;

public class AdminCareerQuizQueries : IAdminCareerQuizQueries
{
    private readonly ItCareersDbContext _context;

    public AdminCareerQuizQueries(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<AdminCareerQuizQuestionDto>> ListAsync(CancellationToken cancellationToken = default)
    {
        var questions = await _context.CareerQuizQuestions
            .AsNoTracking()
            .Where(q => !q.IsDeleted)
            .OrderBy(q => q.OrderIndex)
            .ToListAsync(cancellationToken);

        return questions
            .Select(q => new AdminCareerQuizQuestionDto(
                q.Id,
                q.Text,
                q.OrderIndex,
                q.Options
                    .Select(o => new AdminCareerQuizOptionDto(
                        o.Text,
                        o.TrackWeights.Select(w => new AdminCareerQuizTrackWeightDto(w.TrackId, w.Weight)).ToList()))
                    .ToList()))
            .ToList();
    }
}
