using ItCareers.Domain.Common;

namespace ItCareers.Application.Quizzes;

// No IsCorrect — this is what a learner taking the quiz sees, never the answer key.
public record PublicQuizOptionDto(int Index, LocalizedText Text);
