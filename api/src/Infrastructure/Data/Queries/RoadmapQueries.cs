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

    public async Task<IReadOnlyList<RoadmapSummaryDto>> ListPublishedAsync(string? userId, CancellationToken cancellationToken = default)
    {
        var roadmaps = await _context.Roadmaps
            .AsNoTracking()
            .Include(r => r.Phases)
            .Where(r => r.Status == RoadmapStatus.Published && !r.IsDeleted)
            .OrderBy(r => r.Slug)
            .ToListAsync(cancellationToken);

        var enrolledRoadmapIds = await GetEnrolledRoadmapIdsAsync(userId, cancellationToken);
        var completedCountsByRoadmap = await GetCompletedPhaseCountsByRoadmapAsync(userId, cancellationToken);

        return roadmaps
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
                enrolledRoadmapIds.Contains(r.Id),
                completedCountsByRoadmap.GetValueOrDefault(r.Id)))
            .ToList();
    }

    public async Task<RoadmapDetailDto?> GetBySlugAsync(string slug, string? userId, CancellationToken cancellationToken = default)
    {
        var roadmap = await _context.Roadmaps
            .Include(r => r.Phases).ThenInclude(p => p.Resources)
            .Include(r => r.Phases).ThenInclude(p => p.Projects)
            .Include(r => r.Phases).ThenInclude(p => p.QuizQuestions)
            .Include(r => r.FinalExamQuestions)
            .Where(r => r.Slug == slug && r.Status == RoadmapStatus.Published && !r.IsDeleted)
            .FirstOrDefaultAsync(cancellationToken);

        if (roadmap is null)
        {
            return null;
        }

        var isEnrolled = userId is not null && await _context.Enrollments
            .AnyAsync(e => e.UserId == userId && e.RoadmapId == roadmap.Id, cancellationToken);

        var orderedPhases = roadmap.Phases.Where(p => !p.IsDeleted).OrderBy(p => p.OrderIndex).ToList();

        var completedPhaseIds = new HashSet<Guid>();
        if (userId is not null && orderedPhases.Count > 0)
        {
            var phaseIds = orderedPhases.Select(p => p.Id).ToList();
            completedPhaseIds = (await _context.PhaseCompletions
                    .Where(pc => pc.UserId == userId && phaseIds.Contains(pc.PhaseId))
                    .Select(pc => pc.PhaseId)
                    .ToListAsync(cancellationToken))
                .ToHashSet();
        }

        // The first not-yet-completed phase is "current"; everything after it is locked.
        // Phase 1 is always at least reachable as a free preview (see GetPhaseAsync), so it's
        // never shown as locked even for an anonymous/non-enrolled visitor.
        var currentAssigned = false;
        var phases = orderedPhases
            .Select(p =>
            {
                PhaseProgressStatus status;
                if (completedPhaseIds.Contains(p.Id))
                {
                    status = PhaseProgressStatus.Completed;
                }
                else if (!currentAssigned && (isEnrolled || p.OrderIndex == 1))
                {
                    status = PhaseProgressStatus.Current;
                    currentAssigned = true;
                }
                else
                {
                    status = PhaseProgressStatus.Locked;
                }

                return new PhaseSummaryDto(
                    p.OrderIndex,
                    p.Title,
                    p.Tag,
                    p.Explanation,
                    SplitSkills(p.Skills),
                    p.Resources.Count(r => !r.IsDeleted),
                    p.Projects.Count(pr => !pr.IsDeleted),
                    p.QuizQuestions.Any(q => !q.IsDeleted),
                    status);
            })
            .ToList();

        return new RoadmapDetailDto(
            roadmap.Id,
            roadmap.Slug,
            roadmap.Title,
            roadmap.Description,
            roadmap.Price,
            roadmap.OriginalPrice,
            roadmap.PaddlePriceId,
            roadmap.ImageUrl,
            roadmap.Level,
            roadmap.Outcomes,
            phases,
            orderedPhases.Sum(p => p.Resources.Count(r => !r.IsDeleted)),
            orderedPhases.Sum(p => p.Projects.Count(pr => !pr.IsDeleted)),
            roadmap.FinalExamQuestions.Count(q => !q.IsDeleted),
            isEnrolled,
            completedPhaseIds.Count);
    }

    private static IReadOnlyList<string> SplitSkills(string? skills)
    {
        if (string.IsNullOrWhiteSpace(skills))
        {
            return [];
        }

        return skills
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .ToList();
    }

    private async Task<HashSet<Guid>> GetEnrolledRoadmapIdsAsync(string? userId, CancellationToken cancellationToken)
    {
        if (userId is null)
        {
            return [];
        }

        var ids = await _context.Enrollments
            .Where(e => e.UserId == userId)
            .Select(e => e.RoadmapId)
            .ToListAsync(cancellationToken);

        return ids.ToHashSet();
    }

    private async Task<Dictionary<Guid, int>> GetCompletedPhaseCountsByRoadmapAsync(string? userId, CancellationToken cancellationToken)
    {
        if (userId is null)
        {
            return [];
        }

        var roadmapIdsByCompletedPhase = await _context.PhaseCompletions
            .Where(pc => pc.UserId == userId)
            .Join(_context.Phases, pc => pc.PhaseId, p => p.Id, (pc, p) => p.RoadmapId)
            .ToListAsync(cancellationToken);

        return roadmapIdsByCompletedPhase
            .GroupBy(roadmapId => roadmapId)
            .ToDictionary(g => g.Key, g => g.Count());
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

    public async Task<FinalExamAccessResult> GetFinalExamAsync(
        string roadmapSlug,
        string? userId,
        CancellationToken cancellationToken = default)
    {
        var roadmap = await _context.Roadmaps
            .Include(r => r.FinalExamQuestions)
            .Where(r => r.Slug == roadmapSlug && r.Status == RoadmapStatus.Published && !r.IsDeleted)
            .FirstOrDefaultAsync(cancellationToken);

        if (roadmap is null)
        {
            return new FinalExamAccessResult(FinalExamAccessStatus.NotFound, null);
        }

        var isEnrolled = userId is not null && await _context.Enrollments
            .AnyAsync(e => e.UserId == userId && e.RoadmapId == roadmap.Id, cancellationToken);

        if (!isEnrolled)
        {
            return new FinalExamAccessResult(FinalExamAccessStatus.Locked, null);
        }

        // IsCorrect deliberately never selected here — same principle as the phase quiz.
        var questions = roadmap.FinalExamQuestions
            .Where(q => !q.IsDeleted)
            .OrderBy(q => q.OrderIndex)
            .Select(q => new PublicFinalExamQuestionDto(
                q.Id,
                q.Text,
                q.Options.Select((o, index) => new PublicQuizOptionDto(index, o.Text)).ToList()))
            .ToList();

        return new FinalExamAccessResult(FinalExamAccessStatus.Granted, questions);
    }
}
