namespace ItCareers.Application.Quizzes;

public interface IQuizQuestionCommands
{
    Task<Guid?> CreateAsync(CreateQuizQuestionRequest request, CancellationToken cancellationToken = default);

    Task<bool> UpdateAsync(Guid id, UpdateQuizQuestionRequest request, CancellationToken cancellationToken = default);

    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
