using ItCareers.Domain.Common;
using ItCareers.Domain.Enums;

namespace ItCareers.Application.Roadmaps;

public record UpdateRoadmapRequest(
    LocalizedText Title,
    LocalizedText? Description,
    string Slug,
    decimal Price,
    decimal? OriginalPrice,
    RoadmapStatus Status,
    string? PaddlePriceId,
    string? ImageUrl,
    LocalizedText? Level,
    IReadOnlyList<LocalizedText> Outcomes);
