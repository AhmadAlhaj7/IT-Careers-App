using ItCareers.Domain.Common;

namespace ItCareers.Application.Quizzes;

public record UpdateQuizQuestionRequest(LocalizedText Text, int OrderIndex, IReadOnlyList<QuizOptionInput> Options);
