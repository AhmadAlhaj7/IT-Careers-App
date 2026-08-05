namespace ItCareers.Domain.Entities;

// One learner's pick for one question, as stored inside a CareerQuizSubmission's owned JSON.
public record CareerQuizAnswer(Guid QuestionId, int SelectedOptionIndex)
{
    private CareerQuizAnswer()
        : this(Guid.Empty, 0)
    {
    }
}
