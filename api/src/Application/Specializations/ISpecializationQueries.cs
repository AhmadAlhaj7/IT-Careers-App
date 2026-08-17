namespace ItCareers.Application.Specializations;

// Public, published-only, no auth — mirrors IRoadmapQueries.
public interface ISpecializationQueries
{
    Task<IReadOnlyList<SpecializationSummaryDto>> ListPublishedAsync(CancellationToken cancellationToken = default);

    Task<SpecializationDetailDto?> GetBySlugAsync(string slug, CancellationToken cancellationToken = default);
}
