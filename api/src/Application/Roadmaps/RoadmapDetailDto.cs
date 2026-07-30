using ItCareers.Domain.Common;

namespace ItCareers.Application.Roadmaps;

public record RoadmapDetailDto(
    string Slug,
    LocalizedText Title,
    decimal Price,
    IReadOnlyList<PhaseSummaryDto> Phases);
