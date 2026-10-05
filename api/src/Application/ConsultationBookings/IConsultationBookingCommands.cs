namespace ItCareers.Application.ConsultationBookings;

public interface IConsultationBookingCommands
{
    Task<Guid> CreateAsync(CreateConsultationBookingRequest request, CancellationToken cancellationToken = default);

    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
