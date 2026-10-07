using ItCareers.Application.LearningFiles;
using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Commands;

public class LearningFileCommands : ILearningFileCommands
{
    private readonly ItCareersDbContext _context;

    public LearningFileCommands(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> CreateAsync(SaveLearningFileRequest request, CancellationToken cancellationToken = default)
    {
        var upload = request.NewFile ?? throw new InvalidLearningFileException("لم يتم اختيار ملف.");
        ValidateUpload(upload);
        ValidateDownloadRule(request.AllowDownload, upload.ContentType);

        var id = Guid.NewGuid();
        var now = DateTimeOffset.UtcNow;

        _context.LearningFiles.Add(new LearningFile(
            id,
            request.Title,
            request.Description,
            request.Category,
            upload.FileName,
            upload.ContentType,
            upload.Bytes.LongLength,
            request.AllowDownload,
            request.Published,
            now));
        _context.LearningFileContents.Add(new LearningFileContent(id, upload.Bytes));
        await _context.SaveChangesAsync(cancellationToken);

        return id;
    }

    public async Task<bool> UpdateAsync(Guid id, SaveLearningFileRequest request, CancellationToken cancellationToken = default)
    {
        var file = await _context.LearningFiles.FirstOrDefaultAsync(f => f.Id == id && !f.IsDeleted, cancellationToken);
        if (file is null)
        {
            return false;
        }

        // The rule has to be checked against the file that will actually be stored afterwards.
        var effectiveContentType = request.NewFile?.ContentType ?? file.ContentType;
        if (request.NewFile is not null)
        {
            ValidateUpload(request.NewFile);
        }
        ValidateDownloadRule(request.AllowDownload, effectiveContentType);

        var now = DateTimeOffset.UtcNow;
        file.UpdateDetails(request.Title, request.Description, request.Category, request.AllowDownload, request.Published, now);

        if (request.NewFile is not null)
        {
            file.ReplaceFile(request.NewFile.FileName, request.NewFile.ContentType, request.NewFile.Bytes.LongLength, now);
            var content = await _context.LearningFileContents.FirstAsync(c => c.LearningFileId == id, cancellationToken);
            content.Replace(request.NewFile.Bytes);
        }

        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var file = await _context.LearningFiles.FirstOrDefaultAsync(f => f.Id == id && !f.IsDeleted, cancellationToken);
        if (file is null)
        {
            return false;
        }

        file.Delete();

        var content = await _context.LearningFileContents.FirstOrDefaultAsync(c => c.LearningFileId == id, cancellationToken);
        if (content is not null)
        {
            _context.LearningFileContents.Remove(content);
        }

        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }

    private static void ValidateUpload(LearningFileUpload upload)
    {
        if (upload.Bytes.Length == 0)
        {
            throw new InvalidLearningFileException("الملف المرفوع فارغ.");
        }

        if (upload.Bytes.LongLength > LearningFileLimits.MaxFileBytes)
        {
            throw new InvalidLearningFileException($"حجم الملف يتجاوز الحد الأقصى ({LearningFileLimits.MaxFileBytes / 1024 / 1024} MB).");
        }
    }

    private static void ValidateDownloadRule(bool allowDownload, string contentType)
    {
        if (!allowDownload && !FilePreviewRules.CanPreview(contentType))
        {
            throw new InvalidLearningFileException("هذا النوع من الملفات لا يمكن عرضه في المتصفح، فيجب السماح بالتحميل وإلا لن يتمكن أحد من فتحه.");
        }
    }
}
