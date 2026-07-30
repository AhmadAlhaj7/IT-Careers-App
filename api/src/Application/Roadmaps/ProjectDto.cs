using ItCareers.Domain.Common;

namespace ItCareers.Application.Roadmaps;

public record ProjectDto(LocalizedText Title, LocalizedText Description, bool IsCapstone);
