namespace ItCareers.Application.Tracks;

public interface ITrackQueries
{
    Task<IReadOnlyList<TrackListItemDto>> ListPublishedAsync(CancellationToken cancellationToken = default);

    Task<TrackDetailDto?> GetBySlugAsync(string slug, CancellationToken cancellationToken = default);
}
