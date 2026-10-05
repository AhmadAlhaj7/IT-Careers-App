using ItCareers.Domain.Common;

namespace ItCareers.Domain.Entities;

// Write-once lead from the public "build me a website" page, same shape of idea as
// ConsultationBooking: a record of one submission, never edited afterwards, no user/auth link.
// WebsiteType holds a stable key from the frontend's option list (e.g. "business"), not display text.
public class WebsiteOrder : Entity
{
    public string FullName { get; private set; } = string.Empty;
    public string Phone { get; private set; } = string.Empty;
    public string Email { get; private set; } = string.Empty;
    public string ProjectName { get; private set; } = string.Empty;
    public string WebsiteType { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public string PreferredContactTime { get; private set; } = string.Empty;
    public DateTimeOffset SubmittedAt { get; private set; }

    private WebsiteOrder()
    {
    }

    public WebsiteOrder(
        Guid id,
        string fullName,
        string phone,
        string email,
        string projectName,
        string websiteType,
        string description,
        string preferredContactTime,
        DateTimeOffset submittedAt)
        : base(id)
    {
        FullName = fullName;
        Phone = phone;
        Email = email;
        ProjectName = projectName;
        WebsiteType = websiteType;
        Description = description;
        PreferredContactTime = preferredContactTime;
        SubmittedAt = submittedAt;
    }
}
