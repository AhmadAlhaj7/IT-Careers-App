namespace ItCareers.Application.Enrollments;

public interface IEnrollmentCommands
{
    // Idempotent by design: safe to call more than once with the same paddleTransactionId,
    // since Paddle retries webhook delivery on anything but a clean 2xx response.
    Task EnsureEnrollmentAsync(
        string userId,
        Guid roadmapId,
        string paddleTransactionId,
        CancellationToken cancellationToken = default);
}
