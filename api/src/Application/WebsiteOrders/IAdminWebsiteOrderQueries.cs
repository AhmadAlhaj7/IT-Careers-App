namespace ItCareers.Application.WebsiteOrders;

public interface IAdminWebsiteOrderQueries
{
    Task<IReadOnlyList<AdminWebsiteOrderDto>> ListAsync(CancellationToken cancellationToken = default);
}
