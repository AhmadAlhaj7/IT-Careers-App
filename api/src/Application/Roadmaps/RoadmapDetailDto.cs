using ItCareers.Domain.Common;

namespace ItCareers.Application.Roadmaps;

public record RoadmapDetailDto(
    Guid Id,
    string Slug,
    LocalizedText Title,
    decimal Price,
    string? PaddlePriceId,
    IReadOnlyList<PhaseSummaryDto> Phases);
