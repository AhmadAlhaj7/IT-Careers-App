namespace ItCareers.Application.Roadmaps;

public interface IPhaseCommands
{
    Task<Guid?> CreateAsync(CreatePhaseRequest request, CancellationToken cancellationToken = default);

    Task<bool> UpdateAsync(Guid id, UpdatePhaseRequest request, CancellationToken cancellationToken = default);

    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
