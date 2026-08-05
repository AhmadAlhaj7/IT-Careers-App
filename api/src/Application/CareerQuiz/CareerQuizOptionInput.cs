using ItCareers.Domain.Common;

namespace ItCareers.Application.CareerQuiz;

public record CareerQuizOptionInput(LocalizedText Text, IReadOnlyList<CareerQuizTrackWeightInput> TrackWeights);
