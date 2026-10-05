using ItCareers.Domain.Common;

namespace ItCareers.Domain.Entities;

// Write-once, like CareerQuizSubmission — a lead capture record from the public consultation
// booking page, never edited after the fact. No user/auth link: this form is deliberately
// open to anyone, signed in or not. No Budget/PrefersRemote fields — the offer is fixed-price
// and remote-only, so asking either would just invite negotiation or a scheduling option that
// isn't actually on the table right now.
public class ConsultationBooking : Entity
{
    public string FullName { get; private set; } = string.Empty;
    public string Phone { get; private set; } = string.Empty;
    public string Email { get; private set; } = string.Empty;
    public bool HasPriorExperience { get; private set; }
    public string WebsiteIdea { get; private set; } = string.Empty;
    public string PreferredContactTime { get; private set; } = string.Empty;
    public DateTimeOffset SubmittedAt { get; private set; }

    private ConsultationBooking()
    {
    }

    public ConsultationBooking(
        Guid id,
        string fullName,
        string phone,
        string email,
        bool hasPriorExperience,
        string websiteIdea,
        string preferredContactTime,
        DateTimeOffset submittedAt)
        : base(id)
    {
        FullName = fullName;
        Phone = phone;
        Email = email;
        HasPriorExperience = hasPriorExperience;
        WebsiteIdea = websiteIdea;
        PreferredContactTime = preferredContactTime;
        SubmittedAt = submittedAt;
    }
}
