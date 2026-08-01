using ItCareers.Domain.Common;
using ItCareers.Domain.Enums;

namespace ItCareers.Application.Roadmaps;

public record AdminPhaseDetailDto(
    Guid Id,
    Guid RoadmapId,
    LocalizedText Title,
    int OrderIndex,
    LocalizedText Explanation,
    string? PdfUrl,
    PhaseType PhaseType,
    IReadOnlyList<AdminResourceDto> Resources,
    IReadOnlyList<AdminProjectDto> Projects);
