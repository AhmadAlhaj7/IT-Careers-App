namespace ItCareers.Application.WebsiteOrders;

public record CreateWebsiteOrderRequest(
    string FullName,
    string Phone,
    string Email,
    string ProjectName,
    string WebsiteType,
    string Description,
    string PreferredContactTime);
