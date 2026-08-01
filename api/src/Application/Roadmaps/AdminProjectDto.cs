using ItCareers.Domain.Common;

namespace ItCareers.Application.Roadmaps;

public record AdminProjectDto(Guid Id, LocalizedText Title, LocalizedText Description, bool IsCapstone);
