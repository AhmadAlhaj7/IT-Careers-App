using ItCareers.Application.Quizzes;
using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Commands;

public class FinalExamQuestionCommands : IFinalExamQuestionCommands
{
    private readonly ItCareersDbContext _context;

    public FinalExamQuestionCommands(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<Guid?> CreateAsync(CreateFinalExamQuestionRequest request, CancellationToken cancellationToken = default)
    {
        var roadmapExists = await _context.Roadmaps.AnyAsync(r => r.Id == request.RoadmapId && !r.IsDeleted, cancellationToken);
        if (!roadmapExists)
        {
            return null;
        }

        var question = new FinalExamQuestion(
            Guid.NewGuid(),
            request.RoadmapId,
            request.Text,
            request.OrderIndex,
            request.Options.Select(o => new QuizOption(o.Text, o.IsCorrect)));

        _context.FinalExamQuestions.Add(question);
        await _context.SaveChangesAsync(cancellationToken);

        return question.Id;
    }

    public async Task<bool> UpdateAsync(Guid id, UpdateFinalExamQuestionRequest request, CancellationToken cancellationToken = default)
    {
        var question = await _context.FinalExamQuestions.FirstOrDefaultAsync(q => q.Id == id && !q.IsDeleted, cancellationToken);
        if (question is null)
        {
            return false;
        }

        question.UpdateDetails(request.Text, request.OrderIndex, request.Options.Select(o => new QuizOption(o.Text, o.IsCorrect)));
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var question = await _context.FinalExamQuestions.FirstOrDefaultAsync(q => q.Id == id && !q.IsDeleted, cancellationToken);
        if (question is null)
        {
            return false;
        }

        question.Delete();
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}
