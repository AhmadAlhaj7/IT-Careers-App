using ItCareers.Application.LearningFiles;
using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Queries;

public class LearningFileQueries : ILearningFileQueries
{
    private readonly ItCareersDbContext _context;

    public LearningFileQueries(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<LearningFileDto>> ListAsync(CancellationToken cancellationToken = default)
    {
        var files = await _context.LearningFiles
            .AsNoTracking()
            .Where(f => !f.IsDeleted && f.Published)
            .OrderByDescending(f => f.CreatedAt)
            .ToListAsync(cancellationToken);

        return files.Select(ToDto).ToList();
    }

    public async Task<LearningFileDto?> GetAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var file = await _context.LearningFiles
            .AsNoTracking()
            .FirstOrDefaultAsync(f => f.Id == id && !f.IsDeleted && f.Published, cancellationToken);

        return file is null ? null : ToDto(file);
    }

    public async Task<LearningFileContentDto?> GetContentAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await (
            from f in _context.LearningFiles.AsNoTracking()
            where f.Id == id && !f.IsDeleted && f.Published
            join c in _context.LearningFileContents.AsNoTracking() on f.Id equals c.LearningFileId
            select new LearningFileContentDto(c.Bytes, f.ContentType, f.FileName, f.AllowDownload))
            .FirstOrDefaultAsync(cancellationToken);
    }

    private static LearningFileDto ToDto(LearningFile f) => new(
        f.Id,
        f.Title,
        f.Description,
        f.Category,
        f.FileName,
        f.ContentType,
        f.SizeBytes,
        f.AllowDownload,
        FilePreviewRules.CanPreview(f.ContentType),
        f.CreatedAt);
}

public class AdminLearningFileQueries : IAdminLearningFileQueries
{
    private readonly ItCareersDbContext _context;

    public AdminLearningFileQueries(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<AdminLearningFileDto>> ListAsync(CancellationToken cancellationToken = default)
    {
        var files = await _context.LearningFiles
            .AsNoTracking()
            .Where(f => !f.IsDeleted)
            .OrderByDescending(f => f.CreatedAt)
            .ToListAsync(cancellationToken);

        return files.Select(ToDto).ToList();
    }

    public async Task<AdminLearningFileDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var file = await _context.LearningFiles
            .AsNoTracking()
            .FirstOrDefaultAsync(f => f.Id == id && !f.IsDeleted, cancellationToken);

        return file is null ? null : ToDto(file);
    }

    private static AdminLearningFileDto ToDto(LearningFile f) => new(
        f.Id,
        f.Title,
        f.Description,
        f.Category,
        f.FileName,
        f.ContentType,
        f.SizeBytes,
        f.AllowDownload,
        FilePreviewRules.CanPreview(f.ContentType),
        f.Published,
        f.CreatedAt,
        f.UpdatedAt);
}
