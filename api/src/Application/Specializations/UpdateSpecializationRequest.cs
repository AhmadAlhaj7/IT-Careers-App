using ItCareers.Domain.Common;
using ItCareers.Domain.Enums;

namespace ItCareers.Application.Specializations;

// Full replace, same idiom as UpdateRoadmapRequest — the admin editor is a single form
// spanning every card on the page, so every field is resubmitted together.
public record UpdateSpecializationRequest(
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
    LocalizedText? RoadmapButtonText);
