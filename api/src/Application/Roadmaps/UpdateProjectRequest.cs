using ItCareers.Domain.Common;

namespace ItCareers.Application.Roadmaps;

public record UpdateProjectRequest(LocalizedText Title, LocalizedText Description, bool IsCapstone);
