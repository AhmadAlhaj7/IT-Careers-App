using ItCareers.Domain.Common;

namespace ItCareers.Application.LearningFiles;

// What the public library and viewer need. CanPreview tells the viewer whether there is anything
// to show inline; AllowDownload decides which of the two buttons it offers.
public record LearningFileDto(
    Guid Id,
    LocalizedText Title,
    LocalizedText Description,
    LocalizedText Category,
    string FileName,
    string ContentType,
    long SizeBytes,
    bool AllowDownload,
    bool CanPreview,
    DateTimeOffset CreatedAt);

public record AdminLearningFileDto(
    Guid Id,
    LocalizedText Title,
    LocalizedText Description,
    LocalizedText Category,
    string FileName,
    string ContentType,
    long SizeBytes,
    bool AllowDownload,
    bool CanPreview,
    bool Published,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt);

public record LearningFileContentDto(byte[] Bytes, string ContentType, string FileName, bool AllowDownload);

public record LearningFileUpload(string FileName, string ContentType, byte[] Bytes);

// Shared by create and update. NewFile is required on create and optional on update (null keeps
// the file that's already stored).
public record SaveLearningFileRequest(
    LocalizedText Title,
    LocalizedText Description,
    LocalizedText Category,
    bool AllowDownload,
    bool Published,
    LearningFileUpload? NewFile);
