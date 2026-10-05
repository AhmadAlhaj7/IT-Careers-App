namespace ItCareers.Application.ConsultationBookings;

public record AdminConsultationBookingDto(
    Guid Id,
    string FullName,
    string Phone,
    string Email,
    bool HasPriorExperience,
    string WebsiteIdea,
    string PreferredContactTime,
    DateTimeOffset SubmittedAt);
