namespace ItCareers.Application.Specializations;

public interface IAdminSpecializationQueries
{
    Task<IReadOnlyList<AdminSpecializationSummaryDto>> ListSpecializationsAsync(CancellationToken cancellationToken = default);

    Task<AdminSpecializationDetailDto?> GetSpecializationAsync(Guid id, CancellationToken cancellationToken = default);
}
