using ItCareers.Application.Quizzes;
using ItCareers.Domain.Common;

namespace ItCareers.Application.Roadmaps;

public record PhaseDetailDto(
    int OrderIndex,
    LocalizedText Title,
    LocalizedText Explanation,
    string? PdfUrl,
    IReadOnlyList<ResourceDto> Resources,
    IReadOnlyList<ProjectDto> Projects,
    IReadOnlyList<PublicQuizQuestionDto> QuizQuestions);
