using ItCareers.Application.Roadmaps;
using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Commands;

public class RoadmapCommands : IRoadmapCommands
{
    private readonly ItCareersDbContext _context;

    public RoadmapCommands(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<Guid?> CreateAsync(CreateRoadmapRequest request, CancellationToken cancellationToken = default)
    {
        var trackExists = await _context.Tracks.AnyAsync(t => t.Id == request.TrackId, cancellationToken);
        if (!trackExists)
        {
            return null;
        }

        await EnsureSlugAvailableAsync(request.Slug, excludingId: null, cancellationToken);

        var roadmap = new Roadmap(Guid.NewGuid(), request.TrackId, request.Title, request.Slug, request.Price, request.Status);
        _context.Roadmaps.Add(roadmap);
        await _context.SaveChangesAsync(cancellationToken);

        return roadmap.Id;
    }

    public async Task<bool> UpdateAsync(Guid id, UpdateRoadmapRequest request, CancellationToken cancellationToken = default)
    {
        var roadmap = await _context.Roadmaps.FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted, cancellationToken);
        if (roadmap is null)
        {
            return false;
        }

        await EnsureSlugAvailableAsync(request.Slug, excludingId: id, cancellationToken);

        roadmap.UpdateDetails(request.Title, request.Slug, request.Price, request.Status);
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }

    // Slug carries a unique index at the database level; checking here first turns what
    // would otherwise be a raw, unhandled constraint-violation crash into a clear error the
    // admin UI can actually show.
    private async Task EnsureSlugAvailableAsync(string slug, Guid? excludingId, CancellationToken cancellationToken)
    {
        // A soft-deleted roadmap no longer counts as "using" its slug — from the admin's
        // perspective it's gone, so the slug should be free to reuse.
        var slugTaken = await _context.Roadmaps
            .AnyAsync(r => r.Slug == slug && r.Id != excludingId && !r.IsDeleted, cancellationToken);

        if (slugTaken)
        {
            throw new RoadmapSlugConflictException(slug);
        }
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        // Soft delete: load every descendant so Roadmap.Delete() can cascade the flag down to
        // its Phases, Resources, and Projects instead of removing rows from the database.
        var roadmap = await _context.Roadmaps
            .Include(r => r.Phases).ThenInclude(p => p.Resources)
            .Include(r => r.Phases).ThenInclude(p => p.Projects)
            .FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted, cancellationToken);

        if (roadmap is null)
        {
            return false;
        }

        roadmap.Delete();
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}
