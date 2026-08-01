using ItCareers.Domain.Common;
using ItCareers.Domain.Enums;

namespace ItCareers.Application.Roadmaps;

public record UpdatePhaseRequest(
    LocalizedText Title,
    int OrderIndex,
    LocalizedText Explanation,
    string? PdfUrl,
    PhaseType PhaseType);
