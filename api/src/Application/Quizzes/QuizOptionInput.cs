using ItCareers.Domain.Common;

namespace ItCareers.Application.Quizzes;

public record QuizOptionInput(LocalizedText Text, bool IsCorrect);
