namespace ItCareers.Application.WebsiteOrders;

public record AdminWebsiteOrderDto(
    Guid Id,
    string FullName,
    string Phone,
    string Email,
    string ProjectName,
    string WebsiteType,
    string Description,
    string PreferredContactTime,
    DateTimeOffset SubmittedAt);
