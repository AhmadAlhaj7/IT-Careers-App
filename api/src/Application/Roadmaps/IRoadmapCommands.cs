namespace ItCareers.Application.Roadmaps;

// Mirrors IRoadmapQueries: the controller depends on this, never on EF Core directly.
// CreateAsync returns null when the referenced TrackId doesn't exist, so the controller
// can tell "bad request" apart from "server broke" without either layer knowing about HTTP.
public interface IRoadmapCommands
{
    Task<Guid?> CreateAsync(CreateRoadmapRequest request, CancellationToken cancellationToken = default);

    Task<bool> UpdateAsync(Guid id, UpdateRoadmapRequest request, CancellationToken cancellationToken = default);

    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
