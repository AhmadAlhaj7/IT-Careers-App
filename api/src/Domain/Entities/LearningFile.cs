using ItCareers.Domain.Common;

namespace ItCareers.Domain.Entities;

// Metadata only — the file's bytes live in LearningFileContent so listing or editing a file
// (title, the download toggle) never drags the whole upload through memory.
public class LearningFile : Entity
{
    public LocalizedText Title { get; private set; } = null!;
    public LocalizedText Description { get; private set; } = null!;
    public LocalizedText Category { get; private set; } = null!;
    public string FileName { get; private set; } = string.Empty;
    public string ContentType { get; private set; } = string.Empty;
    public long SizeBytes { get; private set; }

    // Decides whether the public /download endpoint serves this file. Viewing in the browser is
    // always allowed for a published file.
    public bool AllowDownload { get; private set; }
    public bool Published { get; private set; }
    public DateTimeOffset CreatedAt { get; private set; }
    public DateTimeOffset UpdatedAt { get; private set; }

    private LearningFile()
    {
    }

    public LearningFile(
        Guid id,
        LocalizedText title,
        LocalizedText description,
        LocalizedText category,
        string fileName,
        string contentType,
        long sizeBytes,
        bool allowDownload,
        bool published,
        DateTimeOffset now)
        : base(id)
    {
        Title = title;
        Description = description;
        Category = category;
        FileName = fileName;
        ContentType = contentType;
        SizeBytes = sizeBytes;
        AllowDownload = allowDownload;
        Published = published;
        CreatedAt = now;
        UpdatedAt = now;
    }

    public void UpdateDetails(
        LocalizedText title,
        LocalizedText description,
        LocalizedText category,
        bool allowDownload,
        bool published,
        DateTimeOffset now)
    {
        Title = title;
        Description = description;
        Category = category;
        AllowDownload = allowDownload;
        Published = published;
        UpdatedAt = now;
    }

    public void ReplaceFile(string fileName, string contentType, long sizeBytes, DateTimeOffset now)
    {
        FileName = fileName;
        ContentType = contentType;
        SizeBytes = sizeBytes;
        UpdatedAt = now;
    }
}
