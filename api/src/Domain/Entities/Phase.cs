using ItCareers.Domain.Common;
using ItCareers.Domain.Enums;

namespace ItCareers.Domain.Entities;

public class Phase : Entity
{
    public Guid RoadmapId { get; private set; }
    public Roadmap? Roadmap { get; private set; }
    public LocalizedText Title { get; private set; } = null!;
    public int OrderIndex { get; private set; }
    public LocalizedText Explanation { get; private set; } = null!;
    public string? PdfUrl { get; private set; }
    public PhaseType PhaseType { get; private set; }
    public LocalizedText? Tag { get; private set; }
    public string? Skills { get; private set; }

    private readonly List<Resource> _resources = [];
    public IReadOnlyCollection<Resource> Resources => _resources;

    private readonly List<Project> _projects = [];
    public IReadOnlyCollection<Project> Projects => _projects;

    private readonly List<QuizQuestion> _quizQuestions = [];
    public IReadOnlyCollection<QuizQuestion> QuizQuestions => _quizQuestions;

    private Phase()
    {
    }

    public Phase(
        Guid id,
        Guid roadmapId,
        LocalizedText title,
        int orderIndex,
        LocalizedText explanation,
        string? pdfUrl,
        PhaseType phaseType)
        : base(id)
    {
        RoadmapId = roadmapId;
        Title = title;
        OrderIndex = orderIndex;
        Explanation = explanation;
        PdfUrl = pdfUrl;
        PhaseType = phaseType;
    }

    public void UpdateDetails(
        LocalizedText title,
        int orderIndex,
        LocalizedText explanation,
        string? pdfUrl,
        PhaseType phaseType,
        LocalizedText? tag,
        string? skills)
    {
        Title = title;
        OrderIndex = orderIndex;
        Explanation = explanation;
        PdfUrl = pdfUrl;
        PhaseType = phaseType;
        Tag = tag;
        Skills = skills;
    }

    public override void Delete()
    {
        base.Delete();
        foreach (var resource in _resources)
        {
            resource.Delete();
        }

        foreach (var project in _projects)
        {
            project.Delete();
        }

        foreach (var quizQuestion in _quizQuestions)
        {
            quizQuestion.Delete();
        }
    }
}
