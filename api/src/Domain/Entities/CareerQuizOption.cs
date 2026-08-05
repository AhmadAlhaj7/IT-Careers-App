using ItCareers.Domain.Common;

namespace ItCareers.Domain.Entities;

// Same "value object living inside a JSON column" shape as QuizOption, but instead of a
// single IsCorrect flag, each option carries a weight per track — picking it nudges the
// learner's final recommendation toward every track it's tagged with.
public record CareerQuizOption(LocalizedText Text, IReadOnlyList<TrackWeight> TrackWeights)
{
    private CareerQuizOption()
        : this(null!, [])
    {
    }
}
