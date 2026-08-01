using ItCareers.Domain.Common;

namespace ItCareers.Domain.Entities;

public class Project : Entity
{
    public Guid PhaseId { get; private set; }
    public Phase? Phase { get; private set; }
    public LocalizedText Title { get; private set; } = null!;
    public LocalizedText Description { get; private set; } = null!;
    public bool IsCapstone { get; private set; }

    private Project()
    {
    }

    public Project(Guid id, Guid phaseId, LocalizedText title, LocalizedText description, bool isCapstone)
        : base(id)
    {
        PhaseId = phaseId;
        Title = title;
        Description = description;
        IsCapstone = isCapstone;
    }

    public void UpdateDetails(LocalizedText title, LocalizedText description, bool isCapstone)
    {
        Title = title;
        Description = description;
        IsCapstone = isCapstone;
    }
}
