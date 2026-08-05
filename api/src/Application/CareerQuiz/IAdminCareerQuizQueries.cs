namespace ItCareers.Application.CareerQuiz;

public interface IAdminCareerQuizQueries
{
    Task<IReadOnlyList<AdminCareerQuizQuestionDto>> ListAsync(CancellationToken cancellationToken = default);
}
