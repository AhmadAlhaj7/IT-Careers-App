using ItCareers.Domain.Common;

namespace ItCareers.Application.Roadmaps;

public record CreateProjectRequest(Guid PhaseId, LocalizedText Title, LocalizedText Description, bool IsCapstone);
