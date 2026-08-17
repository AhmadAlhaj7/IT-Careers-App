using ItCareers.Application.Specializations;
using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Npgsql;

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
        await SaveChangesOrThrowConflictAsync(request.Slug, cancellationToken);

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
        await SaveChangesOrThrowConflictAsync(request.Slug, cancellationToken);

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

    // EnsureSlugAvailableAsync's check-then-insert isn't atomic — two requests for the same
    // slug (a double-click on save, or a retry after a slow/dropped response) can both pass
    // the check before either has committed, and the second one's INSERT/UPDATE then hits the
    // database's own unique index and throws a raw, unhandled Postgres exception instead of
    // the friendly conflict message. The index is the real guarantee; this just makes sure
    // violating it still surfaces as SpecializationSlugConflictException, not a 500.
    private async Task SaveChangesOrThrowConflictAsync(string slug, CancellationToken cancellationToken)
    {
        try
        {
            await _context.SaveChangesAsync(cancellationToken);
        }
        catch (DbUpdateException ex) when (ex.InnerException is PostgresException { SqlState: PostgresErrorCodes.UniqueViolation, ConstraintName: "IX_Specializations_Slug" })
        {
            throw new SpecializationSlugConflictException(slug);
        }
    }
}
