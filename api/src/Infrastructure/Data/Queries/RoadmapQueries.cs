using ItCareers.Application.Quizzes;
using ItCareers.Application.Roadmaps;
using ItCareers.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Queries;

public class RoadmapQueries : IRoadmapQueries
{
    private readonly ItCareersDbContext _context;

    public RoadmapQueries(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<RoadmapSummaryDto>> ListPublishedAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Roadmaps
            .AsNoTracking()
            .Where(r => r.Status == RoadmapStatus.Published && !r.IsDeleted)
            .OrderBy(r => r.Slug)
            .Select(r => new RoadmapSummaryDto(r.Slug, r.Title, r.Price))
            .ToListAsync(cancellationToken);
    }

    public async Task<RoadmapDetailDto?> GetBySlugAsync(string slug, CancellationToken cancellationToken = default)
    {
        var roadmap = await _context.Roadmaps
            .Include(r => r.Phases)
            .Where(r => r.Slug == slug && r.Status == RoadmapStatus.Published && !r.IsDeleted)
            .FirstOrDefaultAsync(cancellationToken);

        if (roadmap is null)
        {
            return null;
        }

        var phases = roadmap.Phases
            .Where(p => !p.IsDeleted)
            .OrderBy(p => p.OrderIndex)
            .Select(p => new PhaseSummaryDto(p.OrderIndex, p.Title))
            .ToList();

        return new RoadmapDetailDto(roadmap.Id, roadmap.Slug, roadmap.Title, roadmap.Price, roadmap.PaddlePriceId, phases);
    }

    public async Task<PhaseAccessResult> GetPhaseAsync(
        string roadmapSlug,
        int orderIndex,
        string? userId,
        CancellationToken cancellationToken = default)
    {
        var phase = await _context.Phases
            .Include(p => p.Resources)
            .Include(p => p.Projects)
            .Include(p => p.QuizQuestions)
            .Where(p => p.Roadmap!.Slug == roadmapSlug
                && p.Roadmap.Status == RoadmapStatus.Published
                && !p.Roadmap.IsDeleted
                && p.OrderIndex == orderIndex
                && !p.IsDeleted)
            .FirstOrDefaultAsync(cancellationToken);

        if (phase is null)
        {
            return new PhaseAccessResult(PhaseAccessStatus.NotFound, null, null);
        }

        // Phase 1 of every roadmap is a free preview — the spec's "try before you buy," no
        // enrollment required. Every later phase needs a matching Enrollment for this roadmap.
        var hasAccess = phase.OrderIndex == 1;
        if (!hasAccess && userId is not null)
        {
            hasAccess = await _context.Enrollments
                .AnyAsync(e => e.UserId == userId && e.RoadmapId == phase.RoadmapId, cancellationToken);
        }

        if (!hasAccess)
        {
            return new PhaseAccessResult(PhaseAccessStatus.Locked, phase.Title, null);
        }

        var resources = phase.Resources
            .Where(r => !r.IsDeleted)
            .Select(r => new ResourceDto(r.Title, r.Url, r.ResourceType, r.AccessType))
            .ToList();

        var projects = phase.Projects
            .Where(p => !p.IsDeleted)
            .Select(p => new ProjectDto(p.Title, p.Description, p.IsCapstone))
            .ToList();

        // IsCorrect is deliberately never selected here — this is what a learner taking the
        // quiz receives, and the option's own array position doubles as its answer index.
        var quizQuestions = phase.QuizQuestions
            .Where(q => !q.IsDeleted)
            .OrderBy(q => q.OrderIndex)
            .Select(q => new PublicQuizQuestionDto(
                q.Id,
                q.Text,
                q.Options.Select((o, index) => new PublicQuizOptionDto(index, o.Text)).ToList()))
            .ToList();

        var dto = new PhaseDetailDto(phase.OrderIndex, phase.Title, phase.Explanation, phase.PdfUrl, resources, projects, quizQuestions);
        return new PhaseAccessResult(PhaseAccessStatus.Granted, null, dto);
    }
}
