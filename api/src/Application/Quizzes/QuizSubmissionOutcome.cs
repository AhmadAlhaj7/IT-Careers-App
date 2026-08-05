namespace ItCareers.Application.Quizzes;

public enum QuizSubmissionStatus
{
    NotFound,
    Locked,
    Graded,
}

public record QuizSubmissionOutcome(QuizSubmissionStatus Status, QuizResultDto? Result);
