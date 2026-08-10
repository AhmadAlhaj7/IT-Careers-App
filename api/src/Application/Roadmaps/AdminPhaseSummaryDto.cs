using ItCareers.Domain.Common;

namespace ItCareers.Application.Roadmaps;

public record AdminPhaseSummaryDto(
    Guid Id,
    int OrderIndex,
    LocalizedText Title,
    int ResourceCount,
    int ProjectCount,
    int QuizQuestionCount);
