using ItCareers.Domain.Common;
using ItCareers.Domain.Enums;

namespace ItCareers.Application.Roadmaps;

public record CreateResourceRequest(
    Guid PhaseId,
    LocalizedText Title,
    string Url,
    ResourceType ResourceType,
    ResourceAccessType AccessType);
