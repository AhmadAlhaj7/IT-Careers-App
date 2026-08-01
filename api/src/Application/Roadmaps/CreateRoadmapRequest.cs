using ItCareers.Domain.Common;
using ItCareers.Domain.Enums;

namespace ItCareers.Application.Roadmaps;

public record CreateRoadmapRequest(Guid TrackId, LocalizedText Title, string Slug, decimal Price, RoadmapStatus Status);
