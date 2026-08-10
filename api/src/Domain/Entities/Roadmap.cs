using ItCareers.Domain.Common;
using ItCareers.Domain.Enums;

namespace ItCareers.Domain.Entities;

public class Roadmap : Entity
{
    public Guid TrackId { get; private set; }
    public Track? Track { get; private set; }
    public LocalizedText Title { get; private set; } = null!;
    public LocalizedText? Description { get; private set; }
    public string Slug { get; private set; } = null!;
    public decimal Price { get; private set; }
    public decimal? OriginalPrice { get; private set; }
    public RoadmapStatus Status { get; private set; }
    public string? PaddlePriceId { get; private set; }
    public string? ImageUrl { get; private set; }
    public LocalizedText? Level { get; private set; }

    private readonly List<LocalizedText> _outcomes = [];
    public IReadOnlyList<LocalizedText> Outcomes => _outcomes;

    private readonly List<Phase> _phases = [];
    public IReadOnlyCollection<Phase> Phases => _phases;

    private readonly List<FinalExamQuestion> _finalExamQuestions = [];
    public IReadOnlyCollection<FinalExamQuestion> FinalExamQuestions => _finalExamQuestions;

    private Roadmap()
    {
    }

    public Roadmap(Guid id, Guid trackId, LocalizedText title, string slug, decimal price, RoadmapStatus status)
        : base(id)
    {
        TrackId = trackId;
        Title = title;
        Slug = slug;
        Price = price;
        Status = status;
    }

    public void UpdateDetails(
        LocalizedText title,
        LocalizedText? description,
        string slug,
        decimal price,
        decimal? originalPrice,
        RoadmapStatus status,
        string? paddlePriceId,
        string? imageUrl,
        LocalizedText? level,
        IEnumerable<LocalizedText> outcomes)
    {
        Title = title;
        Description = description;
        Slug = slug;
        Price = price;
        OriginalPrice = originalPrice;
        Status = status;
        PaddlePriceId = paddlePriceId;
        ImageUrl = imageUrl;
        Level = level;
        _outcomes.Clear();
        _outcomes.AddRange(outcomes);
    }

    public override void Delete()
    {
        base.Delete();
        foreach (var phase in _phases)
        {
            phase.Delete();
        }

        foreach (var question in _finalExamQuestions)
        {
            question.Delete();
        }
    }
}
