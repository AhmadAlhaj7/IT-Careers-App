namespace ItCareers.Application.CareerQuiz;

public record CareerQuizSubmissionRequest(string? Email, IReadOnlyList<CareerQuizAnswerInput> Answers);
