namespace ItCareers.Application.Analytics;

public interface IPublicStatsQueries
{
    Task<PublicStatsDto> GetAsync(CancellationToken cancellationToken = default);
}
