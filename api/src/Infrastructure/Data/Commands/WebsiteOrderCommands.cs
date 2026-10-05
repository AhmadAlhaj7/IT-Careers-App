using ItCareers.Application.WebsiteOrders;
using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Commands;

public class WebsiteOrderCommands : IWebsiteOrderCommands
{
    private readonly ItCareersDbContext _context;

    public WebsiteOrderCommands(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> CreateAsync(CreateWebsiteOrderRequest request, CancellationToken cancellationToken = default)
    {
        var order = new WebsiteOrder(
            Guid.NewGuid(),
            request.FullName,
            request.Phone,
            request.Email,
            request.ProjectName,
            request.WebsiteType,
            request.Description,
            request.PreferredContactTime,
            DateTimeOffset.UtcNow);

        _context.WebsiteOrders.Add(order);
        await _context.SaveChangesAsync(cancellationToken);

        return order.Id;
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var order = await _context.WebsiteOrders.FirstOrDefaultAsync(o => o.Id == id && !o.IsDeleted, cancellationToken);
        if (order is null)
        {
            return false;
        }

        order.Delete();
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}
