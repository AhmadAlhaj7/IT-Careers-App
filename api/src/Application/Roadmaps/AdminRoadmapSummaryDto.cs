using ItCareers.Domain.Common;
using ItCareers.Domain.Enums;

namespace ItCareers.Application.Roadmaps;

public record AdminRoadmapSummaryDto(Guid Id, string Slug, LocalizedText Title, RoadmapStatus Status);
