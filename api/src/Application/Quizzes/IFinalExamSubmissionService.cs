namespace ItCareers.Application.Quizzes;

public interface IFinalExamSubmissionService
{
    // Unlike the phase quiz, this requires an actual Enrollment — there's no "phase 1 free"
    // equivalent for the exam. Every attempt is recorded; a passing one issues (or reuses)
    // exactly one Certificate per learner per roadmap.
    Task<FinalExamSubmissionOutcome> SubmitAsync(
        string userId,
        string learnerName,
        string roadmapSlug,
        QuizSubmissionRequest submission,
        CancellationToken cancellationToken = default);
}
