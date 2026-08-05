using ItCareers.Domain.Common;

namespace ItCareers.Application.CareerQuiz;

public record AdminCareerQuizQuestionDto(Guid Id, LocalizedText Text, int OrderIndex, IReadOnlyList<AdminCareerQuizOptionDto> Options);
