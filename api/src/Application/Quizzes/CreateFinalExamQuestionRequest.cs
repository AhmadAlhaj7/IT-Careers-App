using ItCareers.Domain.Common;

namespace ItCareers.Application.Quizzes;

public record CreateFinalExamQuestionRequest(Guid RoadmapId, LocalizedText Text, int OrderIndex, IReadOnlyList<QuizOptionInput> Options);
