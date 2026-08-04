namespace ItCareers.Domain.Common;

public abstract class Entity
{
    public Guid Id { get; protected set; }
    public bool IsDeleted { get; private set; }

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

    // Soft delete: the row stays in the database, every read query filters IsDeleted out.
    // Entities with children override this to cascade the flag, since deleting a Roadmap
    // through the admin UI is expected to also remove its Phases from view.
    public virtual void Delete()
    {
        IsDeleted = true;
    }
}
