using ItCareers.Domain.Common;

namespace ItCareers.Domain.Entities;

// Same shape as QuizQuestion (reuses QuizOption for its options) but scoped to a whole
// Roadmap instead of one Phase — the spec models these as distinct entities.
public class FinalExamQuestion : Entity
{
    public Guid RoadmapId { get; private set; }
    public Roadmap? Roadmap { get; private set; }
    public LocalizedText Text { get; private set; } = null!;
    public int OrderIndex { get; private set; }

    private readonly List<QuizOption> _options = [];
    public IReadOnlyList<QuizOption> Options => _options;

    private FinalExamQuestion()
    {
    }

    public FinalExamQuestion(Guid id, Guid roadmapId, LocalizedText text, int orderIndex, IEnumerable<QuizOption> options)
        : base(id)
    {
        RoadmapId = roadmapId;
        Text = text;
        OrderIndex = orderIndex;
        _options = options.ToList();
    }

    public void UpdateDetails(LocalizedText text, int orderIndex, IEnumerable<QuizOption> options)
    {
        Text = text;
        OrderIndex = orderIndex;
        _options.Clear();
        _options.AddRange(options);
    }
}
