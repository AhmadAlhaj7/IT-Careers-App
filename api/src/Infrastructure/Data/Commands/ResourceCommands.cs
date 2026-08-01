using ItCareers.Application.Roadmaps;
using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Commands;

public class ResourceCommands : IResourceCommands
{
    private readonly ItCareersDbContext _context;

    public ResourceCommands(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<Guid?> CreateAsync(CreateResourceRequest request, CancellationToken cancellationToken = default)
    {
        var phaseExists = await _context.Phases.AnyAsync(p => p.Id == request.PhaseId, cancellationToken);
        if (!phaseExists)
        {
            return null;
        }

        var resource = new Resource(
            Guid.NewGuid(),
            request.PhaseId,
            request.Title,
            request.Url,
            request.ResourceType,
            request.AccessType);

        _context.Resources.Add(resource);
        await _context.SaveChangesAsync(cancellationToken);

        return resource.Id;
    }

    public async Task<bool> UpdateAsync(Guid id, UpdateResourceRequest request, CancellationToken cancellationToken = default)
    {
        var resource = await _context.Resources.FirstOrDefaultAsync(r => r.Id == id, cancellationToken);
        if (resource is null)
        {
            return false;
        }

        resource.UpdateDetails(request.Title, request.Url, request.ResourceType, request.AccessType);
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var resource = await _context.Resources.FirstOrDefaultAsync(r => r.Id == id, cancellationToken);
        if (resource is null)
        {
            return false;
        }

        _context.Resources.Remove(resource);
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}
