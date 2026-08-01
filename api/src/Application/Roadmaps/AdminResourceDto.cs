using ItCareers.Domain.Common;
using ItCareers.Domain.Enums;

namespace ItCareers.Application.Roadmaps;

public record AdminResourceDto(Guid Id, LocalizedText Title, string Url, ResourceType ResourceType, ResourceAccessType AccessType);
