using ItCareers.Domain.Common;

namespace ItCareers.Application.Quizzes;

public record PublicQuizQuestionDto(Guid Id, LocalizedText Text, IReadOnlyList<PublicQuizOptionDto> Options);
