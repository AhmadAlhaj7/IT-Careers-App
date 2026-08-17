using ItCareers.Domain.Common;
using ItCareers.Domain.Enums;

namespace ItCareers.Application.Specializations;

public record SpecializationSummaryDto(
    string Slug,
    LocalizedText Name,
    LocalizedText CardSentence,
    SpecializationCategory Category,
    SpecializationDemandLevel DemandLevel,
    string? CoverImageUrl,
    int EstimatedReadMinutes);
