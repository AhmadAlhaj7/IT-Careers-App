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
            .Include(t => t.Roadmaps).ThenInclude(r => r.Phases)
            .Where(t => t.Slug == slug && t.Published && !t.IsDeleted)
            .FirstOrDefaultAsync(cancellationToken);

        if (track is null)
        {
            return null;
        }

        // No userId here — this listing doesn't carry enrollment/progress state, unlike the
        // roadmap catalog/detail endpoints.
        var roadmaps = track.Roadmaps
            .Where(r => r.Status == RoadmapStatus.Published && !r.IsDeleted)
            .OrderBy(r => r.Slug)
            .Select(r => new RoadmapSummaryDto(
                r.Id,
                r.Slug,
                r.Title,
                r.Description,
                r.Price,
                r.OriginalPrice,
                r.PaddlePriceId,
                r.ImageUrl,
                r.Level,
                r.Phases.Count(p => !p.IsDeleted),
                IsEnrolled: false,
                CompletedPhaseCount: 0))
            .ToList();

        return new TrackDetailDto(track.Slug, track.Name, track.Description, roadmaps);
    }
}
