using ItCareers.Application.Roadmaps;
using ItCareers.Domain.Common;

namespace ItCareers.Application.Tracks;

public record TrackDetailDto(string Slug, LocalizedText Name, LocalizedText Description, IReadOnlyList<RoadmapSummaryDto> Roadmaps);
