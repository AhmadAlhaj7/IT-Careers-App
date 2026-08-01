namespace ItCareers.Application.Roadmaps;

// Unlike IRoadmapQueries (public, Published-only), these return content of any status —
// an admin editing a Draft roadmap needs to be able to read it back.
public interface IAdminRoadmapQueries
{
    Task<IReadOnlyList<AdminRoadmapSummaryDto>> ListRoadmapsAsync(CancellationToken cancellationToken = default);

    Task<AdminRoadmapDetailDto?> GetRoadmapAsync(Guid id, CancellationToken cancellationToken = default);

    Task<AdminPhaseDetailDto?> GetPhaseAsync(Guid id, CancellationToken cancellationToken = default);

    Task<IReadOnlyList<TrackSummaryDto>> ListTracksAsync(CancellationToken cancellationToken = default);
}
