using ItCareers.Domain.Common;

namespace ItCareers.Domain.Entities;

// Every attempt is recorded, not just the passing one — unlike PhaseCompletion this is a
// history, so both the learner and future analytics can see how many tries it took.
public class FinalExamAttempt : Entity
{
    public string UserId { get; private set; } = null!;
    public Guid RoadmapId { get; private set; }
    public Roadmap? Roadmap { get; private set; }
    public int Score { get; private set; }
    public int TotalCount { get; private set; }
    public bool Passed { get; private set; }
    public DateTimeOffset AttemptedAt { get; private set; }

    private FinalExamAttempt()
    {
    }

    public FinalExamAttempt(
        Guid id,
        string userId,
        Guid roadmapId,
        int score,
        int totalCount,
        bool passed,
        DateTimeOffset attemptedAt)
        : base(id)
    {
        UserId = userId;
        RoadmapId = roadmapId;
        Score = score;
        TotalCount = totalCount;
        Passed = passed;
        AttemptedAt = attemptedAt;
    }
}
