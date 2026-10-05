using ItCareers.Application.ConsultationBookings;
using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Commands;

public class ConsultationBookingCommands : IConsultationBookingCommands
{
    private readonly ItCareersDbContext _context;

    public ConsultationBookingCommands(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> CreateAsync(CreateConsultationBookingRequest request, CancellationToken cancellationToken = default)
    {
        var booking = new ConsultationBooking(
            Guid.NewGuid(),
            request.FullName,
            request.Phone,
            request.Email,
            request.HasPriorExperience,
            request.WebsiteIdea,
            request.PreferredContactTime,
            DateTimeOffset.UtcNow);

        _context.ConsultationBookings.Add(booking);
        await _context.SaveChangesAsync(cancellationToken);

        return booking.Id;
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var booking = await _context.ConsultationBookings.FirstOrDefaultAsync(b => b.Id == id && !b.IsDeleted, cancellationToken);
        if (booking is null)
        {
            return false;
        }

        booking.Delete();
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}
