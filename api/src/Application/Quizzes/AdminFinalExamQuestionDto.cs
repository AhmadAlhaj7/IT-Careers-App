using ItCareers.Domain.Common;

namespace ItCareers.Application.Quizzes;

public record AdminFinalExamQuestionDto(Guid Id, LocalizedText Text, int OrderIndex, IReadOnlyList<AdminQuizOptionDto> Options);
