using ItCareers.Domain.Enums;

namespace ItCareers.Application.WebsiteOrders;

public interface IWebsiteOrderCommands
{
    Task<Guid> CreateAsync(CreateWebsiteOrderRequest request, CancellationToken cancellationToken = default);

    Task<bool> ChangeStatusAsync(Guid id, LeadStatus status, CancellationToken cancellationToken = default);

    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
