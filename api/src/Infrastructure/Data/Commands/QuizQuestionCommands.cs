using ItCareers.Application.Quizzes;
using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Commands;

public class QuizQuestionCommands : IQuizQuestionCommands
{
    private readonly ItCareersDbContext _context;

    public QuizQuestionCommands(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<Guid?> CreateAsync(CreateQuizQuestionRequest request, CancellationToken cancellationToken = default)
    {
        var phaseExists = await _context.Phases.AnyAsync(p => p.Id == request.PhaseId && !p.IsDeleted, cancellationToken);
        if (!phaseExists)
        {
            return null;
        }

        var question = new QuizQuestion(
            Guid.NewGuid(),
            request.PhaseId,
            request.Text,
            request.OrderIndex,
            request.Options.Select(o => new QuizOption(o.Text, o.IsCorrect)));

        _context.QuizQuestions.Add(question);
        await _context.SaveChangesAsync(cancellationToken);

        return question.Id;
    }

    public async Task<bool> UpdateAsync(Guid id, UpdateQuizQuestionRequest request, CancellationToken cancellationToken = default)
    {
        var question = await _context.QuizQuestions.FirstOrDefaultAsync(q => q.Id == id && !q.IsDeleted, cancellationToken);
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
        var question = await _context.QuizQuestions.FirstOrDefaultAsync(q => q.Id == id && !q.IsDeleted, cancellationToken);
        if (question is null)
        {
            return false;
        }

        question.Delete();
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}
