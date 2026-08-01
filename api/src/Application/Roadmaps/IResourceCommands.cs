namespace ItCareers.Application.Roadmaps;

public interface IResourceCommands
{
    Task<Guid?> CreateAsync(CreateResourceRequest request, CancellationToken cancellationToken = default);

    Task<bool> UpdateAsync(Guid id, UpdateResourceRequest request, CancellationToken cancellationToken = default);

    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
