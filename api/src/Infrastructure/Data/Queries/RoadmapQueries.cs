using ItCareers.Application.Roadmaps;
using ItCareers.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Queries;

public class RoadmapQueries : IRoadmapQueries
{
    private readonly ItCareersDbContext _context;

    public RoadmapQueries(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<RoadmapDetailDto?> GetBySlugAsync(string slug, CancellationToken cancellationToken = default)
    {
        var roadmap = await _context.Roadmaps
            .Include(r => r.Phases)
            .Where(r => r.Slug == slug && r.Status == RoadmapStatus.Published)
            .FirstOrDefaultAsync(cancellationToken);

        if (roadmap is null)
        {
            return null;
        }

        var phases = roadmap.Phases
            .OrderBy(p => p.OrderIndex)
            .Select(p => new PhaseSummaryDto(p.OrderIndex, p.Title))
            .ToList();

        return new RoadmapDetailDto(roadmap.Slug, roadmap.Title, roadmap.Price, phases);
    }

    public async Task<PhaseDetailDto?> GetPhaseAsync(
        string roadmapSlug,
        int orderIndex,
        CancellationToken cancellationToken = default)
    {
        var phase = await _context.Phases
            .Include(p => p.Resources)
            .Include(p => p.Projects)
            .Where(p => p.Roadmap!.Slug == roadmapSlug
                && p.Roadmap.Status == RoadmapStatus.Published
                && p.OrderIndex == orderIndex)
            .FirstOrDefaultAsync(cancellationToken);

        if (phase is null)
        {
            return null;
        }

        var resources = phase.Resources
            .Select(r => new ResourceDto(r.Title, r.Url, r.ResourceType, r.AccessType))
            .ToList();

        var projects = phase.Projects
            .Select(p => new ProjectDto(p.Title, p.Description, p.IsCapstone))
            .ToList();

        return new PhaseDetailDto(phase.OrderIndex, phase.Title, phase.Explanation, phase.PdfUrl, resources, projects);
    }
}
