using ItCareers.Application.CareerQuiz;
using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Commands;

public class CareerQuizQuestionCommands : ICareerQuizQuestionCommands
{
    private readonly ItCareersDbContext _context;

    public CareerQuizQuestionCommands(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> CreateAsync(CreateCareerQuizQuestionRequest request, CancellationToken cancellationToken = default)
    {
        var question = new CareerQuizQuestion(Guid.NewGuid(), request.Text, request.OrderIndex, MapOptions(request.Options));

        _context.CareerQuizQuestions.Add(question);
        await _context.SaveChangesAsync(cancellationToken);

        return question.Id;
    }

    public async Task<bool> UpdateAsync(Guid id, UpdateCareerQuizQuestionRequest request, CancellationToken cancellationToken = default)
    {
        var question = await _context.CareerQuizQuestions.FirstOrDefaultAsync(q => q.Id == id && !q.IsDeleted, cancellationToken);
        if (question is null)
        {
            return false;
        }

        question.UpdateDetails(request.Text, request.OrderIndex, MapOptions(request.Options));
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var question = await _context.CareerQuizQuestions.FirstOrDefaultAsync(q => q.Id == id && !q.IsDeleted, cancellationToken);
        if (question is null)
        {
            return false;
        }

        question.Delete();
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }

    private static IEnumerable<CareerQuizOption> MapOptions(IReadOnlyList<CareerQuizOptionInput> options)
    {
        return options.Select(o => new CareerQuizOption(
            o.Text,
            o.TrackWeights.Select(w => new TrackWeight(w.TrackId, w.Weight)).ToList()));
    }
}
