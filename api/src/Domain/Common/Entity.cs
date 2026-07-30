namespace ItCareers.Domain.Common;

public abstract class Entity
{
    public Guid Id { get; protected set; }

    // For EF Core's own materialization only — it can't bind owned/JSON-mapped properties
    // (like LocalizedText) through a constructor, so it needs a parameterless path and
    // sets every property via the private setters instead. Application code should always
    // use the derived types' public constructors, never this one.
    protected Entity()
    {
    }

    protected Entity(Guid id)
    {
        Id = id;
    }
}
