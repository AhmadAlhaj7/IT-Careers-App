using ItCareers.Application.Specializations;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Queries;

public class AdminSpecializationQueries : IAdminSpecializationQueries
{
    private readonly ItCareersDbContext _context;

    public AdminSpecializationQueries(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<AdminSpecializationSummaryDto>> ListSpecializationsAsync(CancellationToken cancellationToken = default)
    {
        var specializations = await _context.Specializations
            .AsNoTracking()
            .Where(s => !s.IsDeleted)
            .OrderBy(s => s.Slug)
            .ToListAsync(cancellationToken);

        // Two simple queries + an in-memory join, rather than a JSON-path SQL join on the
        // owned Title column — same pragmatic style as AdminAnalyticsQueries, plenty fast
        // for the handful of roadmaps/specializations this admin tool ever deals with.
        var roadmapTitlesById = await _context.Roadmaps
            .AsNoTracking()
            .Where(r => !r.IsDeleted)
            .Select(r => new { r.Id, r.Title })
            .ToDictionaryAsync(r => r.Id, r => r.Title.Ar, cancellationToken);

        return specializations
            .Select(s => new AdminSpecializationSummaryDto(
                s.Id,
                s.Slug,
                s.Name,
                s.Status,
                s.Category,
                s.Sections.Count(sec => sec.Enabled),
                s.LinkedRoadmapId.HasValue && roadmapTitlesById.TryGetValue(s.LinkedRoadmapId.Value, out var title) ? title : null,
                s.UpdatedAt))
            .ToList();
    }

    public async Task<AdminSpecializationDetailDto?> GetSpecializationAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var specialization = await _context.Specializations
            .AsNoTracking()
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted, cancellationToken);

        if (specialization is null)
        {
            return null;
        }

        return new AdminSpecializationDetailDto(
            specialization.Id,
            specialization.Name,
            specialization.CardSentence,
            specialization.Summary,
            specialization.Slug,
            specialization.Category,
            specialization.DemandLevel,
            specialization.CoverImageUrl,
            specialization.Status,
            specialization.DemandQuickFact,
            specialization.SalaryQuickFact,
            specialization.TimeToJobQuickFact,
            specialization.DifficultyQuickFact,
            specialization.Sections,
            specialization.IntroVideoUrl,
            specialization.IntroVideoCaption,
            specialization.IntroVideoDurationLabel,
            specialization.PdfUrl,
            specialization.PdfFileName,
            specialization.Faqs,
            specialization.LinkedRoadmapId,
            specialization.RoadmapButtonText,
            specialization.UpdatedAt);
    }
}
