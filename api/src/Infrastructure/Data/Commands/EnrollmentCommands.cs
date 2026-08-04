using ItCareers.Application.Enrollments;
using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Commands;

public class EnrollmentCommands : IEnrollmentCommands
{
    private readonly ItCareersDbContext _context;

    public EnrollmentCommands(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task EnsureEnrollmentAsync(
        string userId,
        Guid roadmapId,
        string paddleTransactionId,
        CancellationToken cancellationToken = default)
    {
        var alreadyProcessed = await _context.Enrollments
            .AnyAsync(e => e.PaddleTransactionId == paddleTransactionId, cancellationToken);

        if (alreadyProcessed)
        {
            return;
        }

        var enrollment = new Enrollment(Guid.NewGuid(), userId, roadmapId, DateTimeOffset.UtcNow, paddleTransactionId);
        _context.Enrollments.Add(enrollment);

        try
        {
            await _context.SaveChangesAsync(cancellationToken);
        }
        catch (DbUpdateException)
        {
            // A concurrent retry of the same webhook (or, extremely unlikely, a second
            // transaction for the same user+roadmap) already created this row — the unique
            // indexes on PaddleTransactionId and (UserId, RoadmapId) mean it's safe to
            // swallow this and treat the enrollment as already in place.
        }
    }
}
