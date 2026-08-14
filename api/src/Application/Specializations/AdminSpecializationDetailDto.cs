using ItCareers.Domain.Common;
using ItCareers.Domain.Enums;

namespace ItCareers.Application.Specializations;

public record AdminSpecializationDetailDto(
    Guid Id,
    LocalizedText Name,
    LocalizedText CardSentence,
    LocalizedText Summary,
    string Slug,
    SpecializationCategory Category,
    SpecializationDemandLevel DemandLevel,
    string? CoverImageUrl,
    SpecializationStatus Status,
    LocalizedText? DemandQuickFact,
    LocalizedText? SalaryQuickFact,
    LocalizedText? TimeToJobQuickFact,
    LocalizedText? DifficultyQuickFact,
    IReadOnlyList<SpecializationSection> Sections,
    string? IntroVideoUrl,
    LocalizedText? IntroVideoCaption,
    string? IntroVideoDurationLabel,
    string? PdfUrl,
    string? PdfFileName,
    IReadOnlyList<SpecializationFaq> Faqs,
    Guid? LinkedRoadmapId,
    LocalizedText? RoadmapButtonText,
    DateTimeOffset UpdatedAt);
