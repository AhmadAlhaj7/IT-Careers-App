using ItCareers.Domain.Common;

namespace ItCareers.Application.Quizzes;

public record UpdateFinalExamQuestionRequest(LocalizedText Text, int OrderIndex, IReadOnlyList<QuizOptionInput> Options);
