using ItCareers.Application.Specializations;
using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Commands;

public class SpecializationCommands : ISpecializationCommands
{
    private readonly ItCareersDbContext _context;

    public SpecializationCommands(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> CreateAsync(CreateSpecializationRequest request, CancellationToken cancellationToken = default)
    {
        await EnsureSlugAvailableAsync(request.Slug, excludingId: null, cancellationToken);

        var specialization = new Specialization(
            Guid.NewGuid(),
            request.Name,
            request.Slug,
            request.Category,
            request.DemandLevel,
            request.Status);

        _context.Specializations.Add(specialization);
        await _context.SaveChangesAsync(cancellationToken);

        return specialization.Id;
    }

    public async Task<bool> UpdateAsync(Guid id, UpdateSpecializationRequest request, CancellationToken cancellationToken = default)
    {
        var specialization = await _context.Specializations.FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted, cancellationToken);
        if (specialization is null)
        {
            return false;
        }

        await EnsureSlugAvailableAsync(request.Slug, excludingId: id, cancellationToken);

        specialization.UpdateDetails(
            request.Name,
            request.CardSentence,
            request.Summary,
            request.Slug,
            request.Category,
            request.DemandLevel,
            request.CoverImageUrl,
            request.Status,
            request.DemandQuickFact,
            request.SalaryQuickFact,
            request.TimeToJobQuickFact,
            request.DifficultyQuickFact,
            request.Sections,
            request.IntroVideoUrl,
            request.IntroVideoCaption,
            request.IntroVideoDurationLabel,
            request.PdfUrl,
            request.PdfFileName,
            request.Faqs,
            request.LinkedRoadmapId,
            request.RoadmapButtonText);
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var specialization = await _context.Specializations.FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted, cancellationToken);
        if (specialization is null)
        {
            return false;
        }

        specialization.Delete();
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }

    private async Task EnsureSlugAvailableAsync(string slug, Guid? excludingId, CancellationToken cancellationToken)
    {
        var slugTaken = await _context.Specializations
            .AnyAsync(s => s.Slug == slug && s.Id != excludingId && !s.IsDeleted, cancellationToken);

        if (slugTaken)
        {
            throw new SpecializationSlugConflictException(slug);
        }
    }
}
