using ItCareers.Domain.Common;

namespace ItCareers.Domain.Entities;

// Write-once, like FinalExamAttempt — a submission is a historical record of one quiz take,
// never edited after the fact. UserId and Email are both optional: per product decision, the
// career quiz result is never gated behind sign-in or email, so anonymous submissions are
// expected and kept anyway for admin analytics (recommendation-to-purchase conversion).
public class CareerQuizSubmission : Entity
{
    public string? UserId { get; private set; }
    public string? Email { get; private set; }
    public Guid RecommendedTrackId { get; private set; }
    public Track? RecommendedTrack { get; private set; }
    public DateTimeOffset SubmittedAt { get; private set; }

    private readonly List<CareerQuizAnswer> _answers = [];
    public IReadOnlyList<CareerQuizAnswer> Answers => _answers;

    private CareerQuizSubmission()
    {
    }

    public CareerQuizSubmission(
        Guid id,
        string? userId,
        string? email,
        Guid recommendedTrackId,
        IEnumerable<CareerQuizAnswer> answers,
        DateTimeOffset submittedAt)
        : base(id)
    {
        UserId = userId;
        Email = email;
        RecommendedTrackId = recommendedTrackId;
        _answers = answers.ToList();
        SubmittedAt = submittedAt;
    }
}
