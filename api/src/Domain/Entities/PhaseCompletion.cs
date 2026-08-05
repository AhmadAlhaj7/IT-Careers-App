using ItCareers.Domain.Common;

namespace ItCareers.Domain.Entities;

// Created only by QuizSubmissionService after a server-graded passing score — never trust a
// client-reported "I passed," same principle as Enrollment never trusting a client-reported payment.
public class PhaseCompletion : Entity
{
    public string UserId { get; private set; } = null!;
    public Guid PhaseId { get; private set; }
    public Phase? Phase { get; private set; }
    public DateTimeOffset CompletedAt { get; private set; }

    private PhaseCompletion()
    {
    }

    public PhaseCompletion(Guid id, string userId, Guid phaseId, DateTimeOffset completedAt)
        : base(id)
    {
        UserId = userId;
        PhaseId = phaseId;
        CompletedAt = completedAt;
    }
}
