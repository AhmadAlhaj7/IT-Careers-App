using ItCareers.Domain.Common;

namespace ItCareers.Application.Roadmaps;

public record RoadmapSummaryDto(
    Guid Id,
    string Slug,
    LocalizedText Title,
    LocalizedText? Description,
    decimal Price,
    string? PaddlePriceId,
    string? ImageUrl);
