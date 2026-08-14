namespace ItCareers.Application.Specializations;

public interface ISpecializationCommands
{
    Task<Guid> CreateAsync(CreateSpecializationRequest request, CancellationToken cancellationToken = default);

    Task<bool> UpdateAsync(Guid id, UpdateSpecializationRequest request, CancellationToken cancellationToken = default);

    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
