using ItCareers.Domain.Common;

namespace ItCareers.Application.CareerQuiz;

public record PublicCareerQuizQuestionDto(Guid Id, LocalizedText Text, IReadOnlyList<PublicCareerQuizOptionDto> Options);
