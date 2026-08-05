using ItCareers.Domain.Common;

namespace ItCareers.Application.Quizzes;

public record AdminQuizOptionDto(LocalizedText Text, bool IsCorrect);
