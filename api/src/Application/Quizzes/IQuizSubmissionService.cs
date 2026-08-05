namespace ItCareers.Application.Quizzes;

public interface IQuizSubmissionService
{
    // Re-grades entirely server-side against the stored correct answers — the client only
    // ever sends which option index it picked per question, never a claimed score. On a
    // passing grade this also records the PhaseCompletion (idempotent on repeat passes).
    // Addressed by slug + orderIndex, same as the public read endpoint, and re-runs the
    // identical enrollment/access check — passing a quiz you haven't unlocked isn't possible.
    Task<QuizSubmissionOutcome> SubmitAsync(
        string userId,
        string roadmapSlug,
        int orderIndex,
        QuizSubmissionRequest submission,
        CancellationToken cancellationToken = default);
}
