namespace ItCareers.Application.Quizzes;

public record QuizSubmissionRequest(IReadOnlyList<QuizAnswerSubmission> Answers);
