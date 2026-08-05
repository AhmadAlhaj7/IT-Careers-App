namespace ItCareers.Application.CareerQuiz;

public interface ICareerQuizSubmissionService
{
    // Returns null when there are no career quiz questions authored yet — nothing to score
    // against, so there's no meaningful recommendation to return or submission to persist.
    Task<CareerQuizResultDto?> SubmitAsync(
        string? userId,
        CareerQuizSubmissionRequest request,
        CancellationToken cancellationToken = default);
}
