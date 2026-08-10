using ItCareers.Application.Quizzes;
using ItCareers.Domain.Common;
using ItCareers.Domain.Enums;

namespace ItCareers.Application.Roadmaps;

public record AdminRoadmapDetailDto(
    Guid Id,
    Guid TrackId,
    LocalizedText Title,
    LocalizedText? Description,
    string Slug,
    decimal Price,
    decimal? OriginalPrice,
    RoadmapStatus Status,
    string? PaddlePriceId,
    string? ImageUrl,
    LocalizedText? Level,
    IReadOnlyList<LocalizedText> Outcomes,
    IReadOnlyList<AdminPhaseSummaryDto> Phases,
    IReadOnlyList<AdminFinalExamQuestionDto> FinalExamQuestions);
