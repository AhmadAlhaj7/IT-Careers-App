namespace ItCareers.Application.Analytics;

public interface IAdminAnalyticsQueries
{
    Task<AdminAnalyticsDto> GetAsync(CancellationToken cancellationToken = default);
}
