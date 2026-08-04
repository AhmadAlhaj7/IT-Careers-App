using ItCareers.Domain.Common;

namespace ItCareers.Domain.Entities;

// The only thing that ever proves a purchase — created exclusively from a verified Paddle
// webhook (see PaymentWebhookController), never from anything the client reports directly.
public class Enrollment : Entity
{
    public string UserId { get; private set; } = null!;
    public Guid RoadmapId { get; private set; }
    public Roadmap? Roadmap { get; private set; }
    public DateTimeOffset PurchasedAt { get; private set; }
    public string PaddleTransactionId { get; private set; } = null!;

    private Enrollment()
    {
    }

    public Enrollment(Guid id, string userId, Guid roadmapId, DateTimeOffset purchasedAt, string paddleTransactionId)
        : base(id)
    {
        UserId = userId;
        RoadmapId = roadmapId;
        PurchasedAt = purchasedAt;
        PaddleTransactionId = paddleTransactionId;
    }
}
