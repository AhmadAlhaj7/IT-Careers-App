using ItCareers.Domain.Enums;

namespace ItCareers.Application.ConsultationBookings;

public record AdminConsultationBookingDto(
    Guid Id,
    string FullName,
    string Phone,
    string Email,
    bool HasPriorExperience,
    bool IsStudent,
    string WebsiteIdea,
    string PreferredContactTime,
    DateTimeOffset SubmittedAt,
    LeadStatus Status);
