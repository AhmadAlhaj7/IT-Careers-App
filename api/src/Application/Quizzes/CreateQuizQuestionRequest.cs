using ItCareers.Domain.Common;

namespace ItCareers.Application.Quizzes;

public record CreateQuizQuestionRequest(Guid PhaseId, LocalizedText Text, int OrderIndex, IReadOnlyList<QuizOptionInput> Options);
