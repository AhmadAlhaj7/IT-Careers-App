using ItCareers.Domain.Common;

namespace ItCareers.Domain.Entities;

public class QuizQuestion : Entity
{
    public Guid PhaseId { get; private set; }
    public Phase? Phase { get; private set; }
    public LocalizedText Text { get; private set; } = null!;
    public int OrderIndex { get; private set; }

    private readonly List<QuizOption> _options = [];
    public IReadOnlyList<QuizOption> Options => _options;

    private QuizQuestion()
    {
    }

    public QuizQuestion(Guid id, Guid phaseId, LocalizedText text, int orderIndex, IEnumerable<QuizOption> options)
        : base(id)
    {
        PhaseId = phaseId;
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
