using ItCareers.Domain.Common;

namespace ItCareers.Application.Quizzes;

public record AdminQuizQuestionDto(Guid Id, LocalizedText Text, int OrderIndex, IReadOnlyList<AdminQuizOptionDto> Options);
