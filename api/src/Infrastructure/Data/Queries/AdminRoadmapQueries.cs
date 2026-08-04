using ItCareers.Application.Roadmaps;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Queries;

public class AdminRoadmapQueries : IAdminRoadmapQueries
{
    private readonly ItCareersDbContext _context;

    public AdminRoadmapQueries(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<AdminRoadmapSummaryDto>> ListRoadmapsAsync(CancellationToken cancellationToken = default)
    {
        // AsNoTracking is required here, not just an optimization: projecting an owned
        // entity (Title, JSON-column-mapped) straight into a DTO on a tracking query makes
        // EF Core throw, since it can't track an owned entity without its owner also being
        // present in the result. Read-only queries should never track anyway.
        return await _context.Roadmaps
            .AsNoTracking()
            .Where(r => !r.IsDeleted)
            .OrderBy(r => r.Slug)
            .Select(r => new AdminRoadmapSummaryDto(r.Id, r.Slug, r.Title, r.Status))
            .ToListAsync(cancellationToken);
    }

    public async Task<AdminRoadmapDetailDto?> GetRoadmapAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var roadmap = await _context.Roadmaps
            .AsNoTracking()
            .Include(r => r.Phases)
            .FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted, cancellationToken);

        if (roadmap is null)
        {
            return null;
        }

        var phases = roadmap.Phases
            .Where(p => !p.IsDeleted)
            .OrderBy(p => p.OrderIndex)
            .Select(p => new AdminPhaseSummaryDto(p.Id, p.OrderIndex, p.Title))
            .ToList();

        return new AdminRoadmapDetailDto(roadmap.Id, roadmap.TrackId, roadmap.Title, roadmap.Slug, roadmap.Price, roadmap.Status, phases);
    }

    public async Task<AdminPhaseDetailDto?> GetPhaseAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var phase = await _context.Phases
            .AsNoTracking()
            .Include(p => p.Resources)
            .Include(p => p.Projects)
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted, cancellationToken);

        if (phase is null)
        {
            return null;
        }

        var resources = phase.Resources
            .Where(r => !r.IsDeleted)
            .Select(r => new AdminResourceDto(r.Id, r.Title, r.Url, r.ResourceType, r.AccessType))
            .ToList();

        var projects = phase.Projects
            .Where(p => !p.IsDeleted)
            .Select(p => new AdminProjectDto(p.Id, p.Title, p.Description, p.IsCapstone))
            .ToList();

        return new AdminPhaseDetailDto(
            phase.Id,
            phase.RoadmapId,
            phase.Title,
            phase.OrderIndex,
            phase.Explanation,
            phase.PdfUrl,
            phase.PhaseType,
            resources,
            projects);
    }

    public async Task<IReadOnlyList<TrackSummaryDto>> ListTracksAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Tracks
            .AsNoTracking()
            .OrderBy(t => t.Slug)
            .Select(t => new TrackSummaryDto(t.Id, t.Name))
            .ToListAsync(cancellationToken);
    }
}
