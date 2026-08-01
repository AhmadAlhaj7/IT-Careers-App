using ItCareers.Domain.Common;
using ItCareers.Domain.Enums;

namespace ItCareers.Application.Roadmaps;

public record AdminRoadmapDetailDto(
    Guid Id,
    Guid TrackId,
    LocalizedText Title,
    string Slug,
    decimal Price,
    RoadmapStatus Status,
    IReadOnlyList<AdminPhaseSummaryDto> Phases);
