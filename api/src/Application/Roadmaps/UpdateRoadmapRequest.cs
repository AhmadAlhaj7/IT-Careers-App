using ItCareers.Domain.Common;
using ItCareers.Domain.Enums;

namespace ItCareers.Application.Roadmaps;

public record UpdateRoadmapRequest(LocalizedText Title, string Slug, decimal Price, RoadmapStatus Status, string? PaddlePriceId);
