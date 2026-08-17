using ItCareers.Domain.Common;

namespace ItCareers.Application.Specializations;

public record LinkedRoadmapSummaryDto(
    string Slug,
    LocalizedText Title,
    decimal Price,
    decimal? OriginalPrice,
    int PhaseCount,
    string? PaddlePriceId);

public record RelatedSpecializationDto(string Slug, LocalizedText Name, LocalizedText CardSentence);
