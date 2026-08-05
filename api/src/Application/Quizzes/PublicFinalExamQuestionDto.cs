using ItCareers.Domain.Common;

namespace ItCareers.Application.Quizzes;

// No IsCorrect — same principle as PublicQuizQuestionDto.
public record PublicFinalExamQuestionDto(Guid Id, LocalizedText Text, IReadOnlyList<PublicQuizOptionDto> Options);
