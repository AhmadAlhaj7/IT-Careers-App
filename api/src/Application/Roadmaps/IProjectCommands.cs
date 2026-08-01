namespace ItCareers.Application.Roadmaps;

public interface IProjectCommands
{
    Task<Guid?> CreateAsync(CreateProjectRequest request, CancellationToken cancellationToken = default);

    Task<bool> UpdateAsync(Guid id, UpdateProjectRequest request, CancellationToken cancellationToken = default);

    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
