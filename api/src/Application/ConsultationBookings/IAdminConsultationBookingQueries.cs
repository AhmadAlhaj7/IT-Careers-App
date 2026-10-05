namespace ItCareers.Application.ConsultationBookings;

public interface IAdminConsultationBookingQueries
{
    Task<IReadOnlyList<AdminConsultationBookingDto>> ListAsync(CancellationToken cancellationToken = default);
}
