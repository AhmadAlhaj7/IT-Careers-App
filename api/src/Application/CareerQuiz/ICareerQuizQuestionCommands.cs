namespace ItCareers.Application.CareerQuiz;

public interface ICareerQuizQuestionCommands
{
    Task<Guid> CreateAsync(CreateCareerQuizQuestionRequest request, CancellationToken cancellationToken = default);

    Task<bool> UpdateAsync(Guid id, UpdateCareerQuizQuestionRequest request, CancellationToken cancellationToken = default);

    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
