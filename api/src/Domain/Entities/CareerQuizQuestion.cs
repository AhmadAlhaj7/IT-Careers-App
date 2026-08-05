using ItCareers.Domain.Common;

namespace ItCareers.Domain.Entities;

// Unlike QuizQuestion/FinalExamQuestion, this belongs to no Roadmap or Phase — the career
// compass quiz is a single, roadmap-agnostic questionnaire used to recommend a Track.
public class CareerQuizQuestion : Entity
{
    public LocalizedText Text { get; private set; } = null!;
    public int OrderIndex { get; private set; }

    private readonly List<CareerQuizOption> _options = [];
    public IReadOnlyList<CareerQuizOption> Options => _options;

    private CareerQuizQuestion()
    {
    }

    public CareerQuizQuestion(Guid id, LocalizedText text, int orderIndex, IEnumerable<CareerQuizOption> options)
        : base(id)
    {
        Text = text;
        OrderIndex = orderIndex;
        _options = options.ToList();
    }

    public void UpdateDetails(LocalizedText text, int orderIndex, IEnumerable<CareerQuizOption> options)
    {
        Text = text;
        OrderIndex = orderIndex;
        _options.Clear();
        _options.AddRange(options);
    }
}
