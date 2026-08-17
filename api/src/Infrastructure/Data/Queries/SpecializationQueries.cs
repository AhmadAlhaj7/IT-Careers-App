using ItCareers.Application.Specializations;
using ItCareers.Domain.Common;
using ItCareers.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Queries;

public class SpecializationQueries : ISpecializationQueries
{
    private const int WordsPerMinute = 200;

    private readonly ItCareersDbContext _context;

    public SpecializationQueries(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<SpecializationSummaryDto>> ListPublishedAsync(CancellationToken cancellationToken = default)
    {
        var specializations = await _context.Specializations
            .AsNoTracking()
            .Where(s => s.Status == SpecializationStatus.Published && !s.IsDeleted)
            .OrderBy(s => s.Slug)
            .ToListAsync(cancellationToken);

        return specializations
            .Select(s => new SpecializationSummaryDto(
                s.Slug,
                s.Name,
                s.CardSentence,
                s.Category,
                s.DemandLevel,
                s.CoverImageUrl,
                EstimateReadMinutes(s.Summary, s.Sections)))
            .ToList();
    }

    public async Task<SpecializationDetailDto?> GetBySlugAsync(string slug, CancellationToken cancellationToken = default)
    {
        var specialization = await _context.Specializations
            .AsNoTracking()
            .FirstOrDefaultAsync(s => s.Slug == slug && s.Status == SpecializationStatus.Published && !s.IsDeleted, cancellationToken);

        if (specialization is null)
        {
            return null;
        }

        var enabledSections = specialization.Sections.Where(sec => sec.Enabled).ToList();

        LinkedRoadmapSummaryDto? linkedRoadmap = null;
        if (specialization.LinkedRoadmapId.HasValue)
        {
            var roadmap = await _context.Roadmaps
                .AsNoTracking()
                .Include(r => r.Phases)
                .FirstOrDefaultAsync(r => r.Id == specialization.LinkedRoadmapId.Value && r.Status == RoadmapStatus.Published && !r.IsDeleted, cancellationToken);

            if (roadmap is not null)
            {
                linkedRoadmap = new LinkedRoadmapSummaryDto(
                    roadmap.Slug,
                    roadmap.Title,
                    roadmap.Price,
                    roadmap.OriginalPrice,
                    roadmap.Phases.Count(p => !p.IsDeleted),
                    roadmap.PaddlePriceId);
            }
        }

        var related = await _context.Specializations
            .AsNoTracking()
            .Where(s => s.Category == specialization.Category && s.Slug != slug && s.Status == SpecializationStatus.Published && !s.IsDeleted)
            .OrderBy(s => s.Slug)
            .Take(3)
            .Select(s => new RelatedSpecializationDto(s.Slug, s.Name, s.CardSentence))
            .ToListAsync(cancellationToken);

        return new SpecializationDetailDto(
            specialization.Name,
            specialization.CardSentence,
            specialization.Summary,
            specialization.Slug,
            specialization.Category,
            specialization.DemandLevel,
            specialization.CoverImageUrl,
            EstimateReadMinutes(specialization.Summary, enabledSections),
            specialization.DemandQuickFact,
            specialization.SalaryQuickFact,
            specialization.TimeToJobQuickFact,
            specialization.DifficultyQuickFact,
            enabledSections,
            specialization.IntroVideoUrl,
            specialization.IntroVideoCaption,
            specialization.IntroVideoDurationLabel,
            specialization.PdfUrl,
            specialization.PdfFileName,
            specialization.Faqs,
            linkedRoadmap,
            specialization.RoadmapButtonText,
            related);
    }

    // A real, if rough, estimate — word count across the summary and every enabled section's
    // body (Arabic, the site's primary language) at a plain silent-reading pace. Not the
    // mockup's identical "6 دقائق" on every card.
    private static int EstimateReadMinutes(LocalizedText summary, IEnumerable<SpecializationSection> sections)
    {
        var wordCount = CountWords(summary.Ar);
        foreach (var section in sections)
        {
            wordCount += CountWords(section.Body.Ar);
            foreach (var item in section.Items)
            {
                wordCount += CountWords(item.Title.Ar) + CountWords(item.Body.Ar);
            }
        }

        return Math.Max(1, (int)Math.Ceiling(wordCount / (double)WordsPerMinute));
    }

    private static int CountWords(string? text)
    {
        return string.IsNullOrWhiteSpace(text)
            ? 0
            : text.Split((char[]?)null, StringSplitOptions.RemoveEmptyEntries).Length;
    }
}
