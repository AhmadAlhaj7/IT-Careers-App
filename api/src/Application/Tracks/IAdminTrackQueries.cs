namespace ItCareers.Application.Tracks;

public interface IAdminTrackQueries
{
    Task<IReadOnlyList<AdminTrackDto>> ListAsync(CancellationToken cancellationToken = default);

    Task<AdminTrackDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
}
