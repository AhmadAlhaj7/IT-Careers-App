using ItCareers.Application.ConsultationBookings;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Queries;

public class AdminConsultationBookingQueries : IAdminConsultationBookingQueries
{
    private readonly ItCareersDbContext _context;

    public AdminConsultationBookingQueries(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<AdminConsultationBookingDto>> ListAsync(CancellationToken cancellationToken = default)
    {
        return await _context.ConsultationBookings
            .AsNoTracking()
            .Where(b => !b.IsDeleted)
            .OrderByDescending(b => b.SubmittedAt)
            .Select(b => new AdminConsultationBookingDto(
                b.Id,
                b.FullName,
                b.Phone,
                b.Email,
                b.HasPriorExperience,
                b.WebsiteIdea,
                b.PreferredContactTime,
                b.SubmittedAt))
            .ToListAsync(cancellationToken);
    }
}
