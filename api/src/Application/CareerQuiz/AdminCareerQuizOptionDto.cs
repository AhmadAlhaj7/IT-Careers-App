using ItCareers.Domain.Common;

namespace ItCareers.Application.CareerQuiz;

public record AdminCareerQuizOptionDto(LocalizedText Text, IReadOnlyList<AdminCareerQuizTrackWeightDto> TrackWeights);
