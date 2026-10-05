using ItCareers.Application.WebsiteOrders;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Queries;

public class AdminWebsiteOrderQueries : IAdminWebsiteOrderQueries
{
    private readonly ItCareersDbContext _context;

    public AdminWebsiteOrderQueries(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<AdminWebsiteOrderDto>> ListAsync(CancellationToken cancellationToken = default)
    {
        return await _context.WebsiteOrders
            .AsNoTracking()
            .Where(o => !o.IsDeleted)
            .OrderByDescending(o => o.SubmittedAt)
            .Select(o => new AdminWebsiteOrderDto(
                o.Id,
                o.FullName,
                o.Phone,
                o.Email,
                o.ProjectName,
                o.WebsiteType,
                o.Description,
                o.PreferredContactTime,
                o.SubmittedAt))
            .ToListAsync(cancellationToken);
    }
}
