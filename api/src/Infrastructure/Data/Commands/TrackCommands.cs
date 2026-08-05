using ItCareers.Application.Tracks;
using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Commands;

public class TrackCommands : ITrackCommands
{
    private readonly ItCareersDbContext _context;

    public TrackCommands(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> CreateAsync(CreateTrackRequest request, CancellationToken cancellationToken = default)
    {
        await EnsureSlugAvailableAsync(request.Slug, excludingId: null, cancellationToken);

        var track = new Track(Guid.NewGuid(), request.Slug, request.Name, request.Description, request.Published);
        _context.Tracks.Add(track);
        await _context.SaveChangesAsync(cancellationToken);

        return track.Id;
    }

    public async Task<bool> UpdateAsync(Guid id, UpdateTrackRequest request, CancellationToken cancellationToken = default)
    {
        var track = await _context.Tracks.FirstOrDefaultAsync(t => t.Id == id && !t.IsDeleted, cancellationToken);
        if (track is null)
        {
            return false;
        }

        await EnsureSlugAvailableAsync(request.Slug, excludingId: id, cancellationToken);

        track.UpdateDetails(request.Slug, request.Name, request.Description, request.Published);
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var track = await _context.Tracks.FirstOrDefaultAsync(t => t.Id == id && !t.IsDeleted, cancellationToken);
        if (track is null)
        {
            return false;
        }

        var hasRoadmaps = await _context.Roadmaps.AnyAsync(r => r.TrackId == id && !r.IsDeleted, cancellationToken);
        if (hasRoadmaps)
        {
            throw new TrackHasRoadmapsException();
        }

        track.Delete();
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }

    private async Task EnsureSlugAvailableAsync(string slug, Guid? excludingId, CancellationToken cancellationToken)
    {
        var slugTaken = await _context.Tracks
            .AnyAsync(t => t.Slug == slug && t.Id != excludingId && !t.IsDeleted, cancellationToken);

        if (slugTaken)
        {
            throw new TrackSlugConflictException(slug);
        }
    }
}
