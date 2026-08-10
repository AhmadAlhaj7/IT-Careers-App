using ItCareers.Domain.Common;

namespace ItCareers.Application.Roadmaps;

public record RoadmapDetailDto(
    Guid Id,
    string Slug,
    LocalizedText Title,
    LocalizedText? Description,
    decimal Price,
    decimal? OriginalPrice,
    string? PaddlePriceId,
    string? ImageUrl,
    LocalizedText? Level,
    IReadOnlyList<LocalizedText> Outcomes,
    IReadOnlyList<PhaseSummaryDto> Phases,
    int TotalResourceCount,
    int TotalProjectCount,
    int FinalExamQuestionCount,
    bool IsEnrolled,
    int CompletedPhaseCount);
