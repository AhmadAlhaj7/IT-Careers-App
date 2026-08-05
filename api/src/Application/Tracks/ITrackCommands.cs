namespace ItCareers.Application.Tracks;

public interface ITrackCommands
{
    Task<Guid> CreateAsync(CreateTrackRequest request, CancellationToken cancellationToken = default);

    Task<bool> UpdateAsync(Guid id, UpdateTrackRequest request, CancellationToken cancellationToken = default);

    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
