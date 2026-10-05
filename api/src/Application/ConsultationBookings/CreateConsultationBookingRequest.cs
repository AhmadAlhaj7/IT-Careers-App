namespace ItCareers.Application.ConsultationBookings;

public record CreateConsultationBookingRequest(
    string FullName,
    string Phone,
    string Email,
    bool HasPriorExperience,
    string WebsiteIdea,
    string PreferredContactTime);
