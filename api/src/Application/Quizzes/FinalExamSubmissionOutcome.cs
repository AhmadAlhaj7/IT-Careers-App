namespace ItCareers.Application.Quizzes;

public enum FinalExamSubmissionStatus
{
    NotFound,
    NotEnrolled,
    Graded,
}

public record FinalExamSubmissionOutcome(FinalExamSubmissionStatus Status, FinalExamResultDto? Result);
