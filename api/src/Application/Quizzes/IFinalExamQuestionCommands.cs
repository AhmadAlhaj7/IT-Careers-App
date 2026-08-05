namespace ItCareers.Application.Quizzes;

public interface IFinalExamQuestionCommands
{
    Task<Guid?> CreateAsync(CreateFinalExamQuestionRequest request, CancellationToken cancellationToken = default);

    Task<bool> UpdateAsync(Guid id, UpdateFinalExamQuestionRequest request, CancellationToken cancellationToken = default);

    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
