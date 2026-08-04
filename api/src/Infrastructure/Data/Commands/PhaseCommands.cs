using ItCareers.Application.Roadmaps;
using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Commands;

public class PhaseCommands : IPhaseCommands
{
    private readonly ItCareersDbContext _context;

    public PhaseCommands(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<Guid?> CreateAsync(CreatePhaseRequest request, CancellationToken cancellationToken = default)
    {
        var roadmapExists = await _context.Roadmaps.AnyAsync(r => r.Id == request.RoadmapId && !r.IsDeleted, cancellationToken);
        if (!roadmapExists)
        {
            return null;
        }

        var phase = new Phase(
            Guid.NewGuid(),
            request.RoadmapId,
            request.Title,
            request.OrderIndex,
            request.Explanation,
            request.PdfUrl,
            request.PhaseType);

        _context.Phases.Add(phase);
        await _context.SaveChangesAsync(cancellationToken);

        return phase.Id;
    }

    public async Task<bool> UpdateAsync(Guid id, UpdatePhaseRequest request, CancellationToken cancellationToken = default)
    {
        var phase = await _context.Phases.FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted, cancellationToken);
        if (phase is null)
        {
            return false;
        }

        phase.UpdateDetails(request.Title, request.OrderIndex, request.Explanation, request.PdfUrl, request.PhaseType);
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var phase = await _context.Phases
            .Include(p => p.Resources)
            .Include(p => p.Projects)
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted, cancellationToken);

        if (phase is null)
        {
            return false;
        }

        phase.Delete();
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}
