using ItCareers.Domain.Common;

namespace ItCareers.Application.Roadmaps;

public record RoadmapSummaryDto(string Slug, LocalizedText Title, decimal Price);
