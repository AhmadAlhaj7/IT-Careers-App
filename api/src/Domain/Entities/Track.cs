using ItCareers.Domain.Common;

namespace ItCareers.Domain.Entities;

public class Track : Entity
{
    // Populated by the public constructor below for real use, or by EF Core via the
    // private one when reading a row back — the `= null!` just satisfies the compiler
    // for that second path, since EF sets these through reflection right afterward.
    public string Slug { get; private set; } = null!;
    public LocalizedText Name { get; private set; } = null!;
    public LocalizedText Description { get; private set; } = null!;
    public bool Published { get; private set; }

    private readonly List<Roadmap> _roadmaps = [];
    public IReadOnlyCollection<Roadmap> Roadmaps => _roadmaps;

    private Track()
    {
    }

    public Track(Guid id, string slug, LocalizedText name, LocalizedText description, bool published)
        : base(id)
    {
        Slug = slug;
        Name = name;
        Description = description;
        Published = published;
    }

    public void UpdateDetails(string slug, LocalizedText name, LocalizedText description, bool published)
    {
        Slug = slug;
        Name = name;
        Description = description;
        Published = published;
    }
}
