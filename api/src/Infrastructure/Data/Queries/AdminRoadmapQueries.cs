using ItCareers.Application.Quizzes;
using ItCareers.Application.Roadmaps;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Queries;

public class AdminRoadmapQueries : IAdminRoadmapQueries
{
    private readonly ItCareersDbContext _context;

    public AdminRoadmapQueries(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<AdminRoadmapSummaryDto>> ListRoadmapsAsync(CancellationToken cancellationToken = default)
    {
        // AsNoTracking is required here, not just an optimization: projecting an owned
        // entity (Title, JSON-column-mapped) straight into a DTO on a tracking query makes
        // EF Core throw, since it can't track an owned entity without its owner also being
        // present in the result. Read-only queries should never track anyway.
        return await _context.Roadmaps
            .AsNoTracking()
            .Where(r => !r.IsDeleted)
            .OrderBy(r => r.Slug)
            .Select(r => new AdminRoadmapSummaryDto(
                r.Id,
                r.Slug,
                r.Title,
                r.Status,
                r.Price,
                r.Phases.Count(p => !p.IsDeleted),
                r.UpdatedAt))
            .ToListAsync(cancellationToken);
    }

    public async Task<AdminRoadmapDetailDto?> GetRoadmapAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var roadmap = await _context.Roadmaps
            .AsNoTracking()
            .Include(r => r.Phases).ThenInclude(p => p.Resources)
            .Include(r => r.Phases).ThenInclude(p => p.Projects)
            .Include(r => r.Phases).ThenInclude(p => p.QuizQuestions)
            .Include(r => r.FinalExamQuestions)
            .FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted, cancellationToken);

        if (roadmap is null)
        {
            return null;
        }

        var phases = roadmap.Phases
            .Where(p => !p.IsDeleted)
            .OrderBy(p => p.OrderIndex)
            .Select(p => new AdminPhaseSummaryDto(
                p.Id,
                p.OrderIndex,
                p.Title,
                p.Resources.Count(r => !r.IsDeleted),
                p.Projects.Count(pr => !pr.IsDeleted),
                p.QuizQuestions.Count(q => !q.IsDeleted)))
            .ToList();

        var finalExamQuestions = roadmap.FinalExamQuestions
            .Where(q => !q.IsDeleted)
            .OrderBy(q => q.OrderIndex)
            .Select(q => new AdminFinalExamQuestionDto(
                q.Id,
                q.Text,
                q.OrderIndex,
                q.Options.Select(o => new AdminQuizOptionDto(o.Text, o.IsCorrect)).ToList()))
            .ToList();

        return new AdminRoadmapDetailDto(
            roadmap.Id,
            roadmap.TrackId,
            roadmap.Title,
            roadmap.Description,
            roadmap.Slug,
            roadmap.Price,
            roadmap.OriginalPrice,
            roadmap.Status,
            roadmap.PaddlePriceId,
            roadmap.ImageUrl,
            roadmap.Level,
            roadmap.Outcomes,
            roadmap.PassThresholdPercent,
            roadmap.SequentialUnlockEnabled,
            roadmap.UpdatedAt,
            phases,
            finalExamQuestions);
    }

    public async Task<AdminPhaseDetailDto?> GetPhaseAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var phase = await _context.Phases
            .AsNoTracking()
            .Include(p => p.Resources)
            .Include(p => p.Projects)
            .Include(p => p.QuizQuestions)
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted, cancellationToken);

        if (phase is null)
        {
            return null;
        }

        var resources = phase.Resources
            .Where(r => !r.IsDeleted)
            .Select(r => new AdminResourceDto(r.Id, r.Title, r.Url, r.ResourceType, r.AccessType))
            .ToList();

        var projects = phase.Projects
            .Where(p => !p.IsDeleted)
            .Select(p => new AdminProjectDto(p.Id, p.Title, p.Description, p.IsCapstone))
            .ToList();

        var quizQuestions = phase.QuizQuestions
            .Where(q => !q.IsDeleted)
            .OrderBy(q => q.OrderIndex)
            .Select(q => new AdminQuizQuestionDto(
                q.Id,
                q.Text,
                q.OrderIndex,
                q.Options.Select(o => new AdminQuizOptionDto(o.Text, o.IsCorrect)).ToList()))
            .ToList();

        return new AdminPhaseDetailDto(
            phase.Id,
            phase.RoadmapId,
            phase.Title,
            phase.OrderIndex,
            phase.Explanation,
            phase.PdfUrl,
            phase.PhaseType,
            phase.Tag,
            phase.Skills,
            resources,
            projects,
            quizQuestions);
    }
}
