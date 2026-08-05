using ItCareers.Domain.Common;

namespace ItCareers.Domain.Entities;

// One per (UserId, RoadmapId), created exactly once on a learner's first passing final-exam
// attempt. Deliberately not cascade-deleted if the Roadmap is later removed — a certificate
// represents something already earned, not content that should disappear with its source.
public class Certificate : Entity
{
    public string UserId { get; private set; } = null!;
    public Guid RoadmapId { get; private set; }
    public Roadmap? Roadmap { get; private set; }
    public string LearnerName { get; private set; } = null!;
    public string VerificationCode { get; private set; } = null!;
    public DateTimeOffset IssuedAt { get; private set; }

    private Certificate()
    {
    }

    public Certificate(Guid id, string userId, Guid roadmapId, string learnerName, string verificationCode, DateTimeOffset issuedAt)
        : base(id)
    {
        UserId = userId;
        RoadmapId = roadmapId;
        LearnerName = learnerName;
        VerificationCode = verificationCode;
        IssuedAt = issuedAt;
    }
}
