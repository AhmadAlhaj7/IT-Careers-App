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

        var roadmap = new Roadmap(Guid.NewGuid(), request.TrackId, request.Title, request.Slug, request.Price, request.Status);
        _context.Roadmaps.Add(roadmap);
        await _context.SaveChangesAsync(cancellationToken);

        return roadmap.Id;
    }

    public async Task<bool> UpdateAsync(Guid id, UpdateRoadmapRequest request, CancellationToken cancellationToken = default)
    {
        var roadmap = await _context.Roadmaps.FirstOrDefaultAsync(r => r.Id == id, cancellationToken);
        if (roadmap is null)
        {
            return false;
        }

        roadmap.UpdateDetails(request.Title, request.Slug, request.Price, request.Status);
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var roadmap = await _context.Roadmaps.FirstOrDefaultAsync(r => r.Id == id, cancellationToken);
        if (roadmap is null)
        {
            return false;
        }

        _context.Roadmaps.Remove(roadmap);
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}
