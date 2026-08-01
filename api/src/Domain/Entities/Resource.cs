using ItCareers.Domain.Common;
using ItCareers.Domain.Enums;

namespace ItCareers.Domain.Entities;

public class Resource : Entity
{
    public Guid PhaseId { get; private set; }
    public Phase? Phase { get; private set; }
    public LocalizedText Title { get; private set; } = null!;
    public string Url { get; private set; } = null!;
    public ResourceType ResourceType { get; private set; }
    public ResourceAccessType AccessType { get; private set; }

    private Resource()
    {
    }

    public Resource(
        Guid id,
        Guid phaseId,
        LocalizedText title,
        string url,
        ResourceType resourceType,
        ResourceAccessType accessType)
        : base(id)
    {
        PhaseId = phaseId;
        Title = title;
        Url = url;
        ResourceType = resourceType;
        AccessType = accessType;
    }

    public void UpdateDetails(LocalizedText title, string url, ResourceType resourceType, ResourceAccessType accessType)
    {
        Title = title;
        Url = url;
        ResourceType = resourceType;
        AccessType = accessType;
    }
}
