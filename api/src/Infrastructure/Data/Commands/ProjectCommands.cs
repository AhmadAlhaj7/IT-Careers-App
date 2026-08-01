using ItCareers.Application.Roadmaps;
using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Commands;

public class ProjectCommands : IProjectCommands
{
    private readonly ItCareersDbContext _context;

    public ProjectCommands(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<Guid?> CreateAsync(CreateProjectRequest request, CancellationToken cancellationToken = default)
    {
        var phaseExists = await _context.Phases.AnyAsync(p => p.Id == request.PhaseId, cancellationToken);
        if (!phaseExists)
        {
            return null;
        }

        var project = new Project(Guid.NewGuid(), request.PhaseId, request.Title, request.Description, request.IsCapstone);
        _context.Projects.Add(project);
        await _context.SaveChangesAsync(cancellationToken);

        return project.Id;
    }

    public async Task<bool> UpdateAsync(Guid id, UpdateProjectRequest request, CancellationToken cancellationToken = default)
    {
        var project = await _context.Projects.FirstOrDefaultAsync(p => p.Id == id, cancellationToken);
        if (project is null)
        {
            return false;
        }

        project.UpdateDetails(request.Title, request.Description, request.IsCapstone);
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var project = await _context.Projects.FirstOrDefaultAsync(p => p.Id == id, cancellationToken);
        if (project is null)
        {
            return false;
        }

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}
