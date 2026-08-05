using ItCareers.Domain.Common;

namespace ItCareers.Application.CareerQuiz;

// No TrackWeights — same principle as PublicQuizOptionDto hiding IsCorrect: scoring internals
// never leave the server.
public record PublicCareerQuizOptionDto(int Index, LocalizedText Text);
