namespace ItCareers.Application.CareerQuiz;

public interface ICareerQuizQueries
{
    Task<IReadOnlyList<PublicCareerQuizQuestionDto>> ListQuestionsAsync(CancellationToken cancellationToken = default);
}
