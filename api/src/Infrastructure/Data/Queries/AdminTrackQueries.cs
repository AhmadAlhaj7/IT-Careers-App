using ItCareers.Application.Tracks;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Queries;

public class AdminTrackQueries : IAdminTrackQueries
{
    private readonly ItCareersDbContext _context;

    public AdminTrackQueries(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<AdminTrackDto>> ListAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Tracks
            .AsNoTracking()
            .Where(t => !t.IsDeleted)
            .OrderBy(t => t.Slug)
            .Select(t => new AdminTrackDto(t.Id, t.Slug, t.Name, t.Description, t.Published))
            .ToListAsync(cancellationToken);
    }

    public async Task<AdminTrackDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.Tracks
            .AsNoTracking()
            .Where(t => t.Id == id && !t.IsDeleted)
            .Select(t => new AdminTrackDto(t.Id, t.Slug, t.Name, t.Description, t.Published))
            .FirstOrDefaultAsync(cancellationToken);
    }
}
