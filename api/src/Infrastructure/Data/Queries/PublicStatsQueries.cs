using ItCareers.Application.Analytics;
using ItCareers.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Queries;

public class PublicStatsQueries : IPublicStatsQueries
{
    private readonly ItCareersDbContext _context;

    public PublicStatsQueries(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<PublicStatsDto> GetAsync(CancellationToken cancellationToken = default)
    {
        var roadmapCount = await _context.Roadmaps
            .CountAsync(r => r.Status == RoadmapStatus.Published && !r.IsDeleted, cancellationToken);

        var enrolledUserIds = await _context.Enrollments
            .Select(e => e.UserId)
            .Distinct()
            .ToListAsync(cancellationToken);

        var certificatesIssuedCount = await _context.Certificates.CountAsync(c => !c.IsDeleted, cancellationToken);

        var phase1Ids = await _context.Phases
            .Where(p => p.OrderIndex == 1 && !p.IsDeleted)
            .Select(p => p.Id)
            .ToListAsync(cancellationToken);

        var completedPhase1UserIds = await _context.PhaseCompletions
            .Where(pc => phase1Ids.Contains(pc.PhaseId))
            .Select(pc => pc.UserId)
            .Distinct()
            .ToListAsync(cancellationToken);

        var phase1CompletionRate = enrolledUserIds.Count == 0
            ? 0d
            : (double)completedPhase1UserIds.Count(enrolledUserIds.Contains) / enrolledUserIds.Count;

        return new PublicStatsDto(roadmapCount, enrolledUserIds.Count, certificatesIssuedCount, phase1CompletionRate);
    }
}
