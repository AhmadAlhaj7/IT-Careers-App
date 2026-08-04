namespace ItCareers.Application.Roadmaps;

// Application defines what it needs; Infrastructure decides how (EF Core, raw SQL,
// whatever) — the controller only ever depends on this interface, never on EF Core directly.
public interface IRoadmapQueries
{
    Task<IReadOnlyList<RoadmapSummaryDto>> ListPublishedAsync(CancellationToken cancellationToken = default);

    Task<RoadmapDetailDto?> GetBySlugAsync(string slug, CancellationToken cancellationToken = default);

    Task<PhaseDetailDto?> GetPhaseAsync(string roadmapSlug, int orderIndex, CancellationToken cancellationToken = default);
}
