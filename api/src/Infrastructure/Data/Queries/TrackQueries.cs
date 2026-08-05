using ItCareers.Application.Roadmaps;
using ItCareers.Application.Tracks;
using ItCareers.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Queries;

public class TrackQueries : ITrackQueries
{
    private readonly ItCareersDbContext _context;

    public TrackQueries(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<TrackListItemDto>> ListPublishedAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Tracks
            .AsNoTracking()
            .Where(t => t.Published && !t.IsDeleted)
            .OrderBy(t => t.Slug)
            .Select(t => new TrackListItemDto(t.Slug, t.Name))
            .ToListAsync(cancellationToken);
    }

    public async Task<TrackDetailDto?> GetBySlugAsync(string slug, CancellationToken cancellationToken = default)
    {
        var track = await _context.Tracks
            .Include(t => t.Roadmaps)
            .Where(t => t.Slug == slug && t.Published && !t.IsDeleted)
            .FirstOrDefaultAsync(cancellationToken);

        if (track is null)
        {
            return null;
        }

        var roadmaps = track.Roadmaps
            .Where(r => r.Status == RoadmapStatus.Published && !r.IsDeleted)
            .OrderBy(r => r.Slug)
            .Select(r => new RoadmapSummaryDto(r.Slug, r.Title, r.Price))
            .ToList();

        return new TrackDetailDto(track.Slug, track.Name, track.Description, roadmaps);
    }
}
