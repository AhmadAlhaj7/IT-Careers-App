using ItCareers.Domain.Common;

namespace ItCareers.Application.Roadmaps;

public record RoadmapSummaryDto(
    Guid Id,
    string Slug,
    LocalizedText Title,
    LocalizedText? Description,
    decimal Price,
    decimal? OriginalPrice,
    string? PaddlePriceId,
    string? ImageUrl,
    LocalizedText? Level,
    int PhaseCount,
    bool IsEnrolled,
    int CompletedPhaseCount,
    bool IsMostPopular);
