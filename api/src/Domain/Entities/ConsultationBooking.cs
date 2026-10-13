using ItCareers.Domain.Common;
using ItCareers.Domain.Enums;

namespace ItCareers.Domain.Entities;

// Write-once details (only the inbox Status moves), like CareerQuizSubmission — a lead capture record from the public consultation
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

    // Ticked "I'm a student" on the form — eligible for the extra student discount (verified when contacted).
    public bool IsStudent { get; private set; }
    public string WebsiteIdea { get; private set; } = string.Empty;
    public string PreferredContactTime { get; private set; } = string.Empty;
    public DateTimeOffset SubmittedAt { get; private set; }

    // Where this lead is in the admin inbox pipeline. The submitted details themselves stay write-once.
    public LeadStatus Status { get; private set; } = LeadStatus.New;

    private ConsultationBooking()
    {
    }

    public ConsultationBooking(
        Guid id,
        string fullName,
        string phone,
        string email,
        bool hasPriorExperience,
        bool isStudent,
        string websiteIdea,
        string preferredContactTime,
        DateTimeOffset submittedAt)
        : base(id)
    {
        FullName = fullName;
        Phone = phone;
        Email = email;
        HasPriorExperience = hasPriorExperience;
        IsStudent = isStudent;
        WebsiteIdea = websiteIdea;
        PreferredContactTime = preferredContactTime;
        SubmittedAt = submittedAt;
    }

    public void ChangeStatus(LeadStatus status)
    {
        Status = status;
    }
}
