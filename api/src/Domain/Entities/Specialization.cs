using ItCareers.Domain.Common;
using ItCareers.Domain.Enums;

namespace ItCareers.Domain.Entities;

// A "tech major" content page — the admin-authored explainer a visitor reads on
// /tech-majors before deciding which paid Roadmap to buy. Not linked to Roadmap via a real
// EF relationship: LinkedRoadmapId is a loose, optional reference (a specialization can
// exist with no roadmap yet, or point at one), and nothing needs a Roadmap -> Specializations
// back-collection, so a plain nullable Guid is enough.
public class Specialization : Entity
{
    public LocalizedText Name { get; private set; } = null!;
    public LocalizedText CardSentence { get; private set; } = null!;
    public LocalizedText Summary { get; private set; } = null!;
    public string Slug { get; private set; } = null!;
    public SpecializationCategory Category { get; private set; }
    public SpecializationDemandLevel DemandLevel { get; private set; }
    public string? CoverImageUrl { get; private set; }
    public SpecializationStatus Status { get; private set; }

    public LocalizedText? DemandQuickFact { get; private set; }
    public LocalizedText? SalaryQuickFact { get; private set; }
    public LocalizedText? TimeToJobQuickFact { get; private set; }
    public LocalizedText? DifficultyQuickFact { get; private set; }

    public string? IntroVideoUrl { get; private set; }
    public LocalizedText? IntroVideoCaption { get; private set; }
    public string? IntroVideoDurationLabel { get; private set; }

    public string? PdfUrl { get; private set; }
    public string? PdfFileName { get; private set; }

    public Guid? LinkedRoadmapId { get; private set; }
    public LocalizedText? RoadmapButtonText { get; private set; }

    public DateTimeOffset UpdatedAt { get; private set; }

    private readonly List<SpecializationSection> _sections = [];
    public IReadOnlyList<SpecializationSection> Sections => _sections;

    private readonly List<SpecializationFaq> _faqs = [];
    public IReadOnlyList<SpecializationFaq> Faqs => _faqs;

    private Specialization()
    {
    }

    public Specialization(
        Guid id,
        LocalizedText name,
        string slug,
        SpecializationCategory category,
        SpecializationDemandLevel demandLevel,
        SpecializationStatus status)
        : base(id)
    {
        Name = name;
        Slug = slug;
        Category = category;
        DemandLevel = demandLevel;
        Status = status;
        CardSentence = new LocalizedText(string.Empty, string.Empty);
        Summary = new LocalizedText(string.Empty, string.Empty);
        UpdatedAt = DateTimeOffset.UtcNow;

        // Seed all 9 fixed sections, enabled by default with empty content — the admin
        // editor's static metadata (titles/hints/placeholders) supplies the guidance text,
        // this just gives every specialization a full, editable set from the start.
        foreach (SpecializationSectionKey key in Enum.GetValues<SpecializationSectionKey>())
        {
            // Two distinct LocalizedText instances, not a shared reference — EF Core's
            // change tracker indexes owned navigations by object identity, and reusing one
            // instance for both Title and Body corrupts the fixup between the two slots.
            _sections.Add(new SpecializationSection(
                key,
                true,
                new LocalizedText(string.Empty, string.Empty),
                new LocalizedText(string.Empty, string.Empty),
                null,
                null,
                []));
        }
    }

    public void UpdateDetails(
        LocalizedText name,
        LocalizedText cardSentence,
        LocalizedText summary,
        string slug,
        SpecializationCategory category,
        SpecializationDemandLevel demandLevel,
        string? coverImageUrl,
        SpecializationStatus status,
        LocalizedText? demandQuickFact,
        LocalizedText? salaryQuickFact,
        LocalizedText? timeToJobQuickFact,
        LocalizedText? difficultyQuickFact,
        IEnumerable<SpecializationSection> sections,
        string? introVideoUrl,
        LocalizedText? introVideoCaption,
        string? introVideoDurationLabel,
        string? pdfUrl,
        string? pdfFileName,
        IEnumerable<SpecializationFaq> faqs,
        Guid? linkedRoadmapId,
        LocalizedText? roadmapButtonText)
    {
        Name = name;
        CardSentence = cardSentence;
        Summary = summary;
        Slug = slug;
        Category = category;
        DemandLevel = demandLevel;
        CoverImageUrl = coverImageUrl;
        Status = status;
        DemandQuickFact = demandQuickFact;
        SalaryQuickFact = salaryQuickFact;
        TimeToJobQuickFact = timeToJobQuickFact;
        DifficultyQuickFact = difficultyQuickFact;
        _sections.Clear();
        _sections.AddRange(sections);
        IntroVideoUrl = introVideoUrl;
        IntroVideoCaption = introVideoCaption;
        IntroVideoDurationLabel = introVideoDurationLabel;
        PdfUrl = pdfUrl;
        PdfFileName = pdfFileName;
        _faqs.Clear();
        _faqs.AddRange(faqs);
        LinkedRoadmapId = linkedRoadmapId;
        RoadmapButtonText = roadmapButtonText;
        UpdatedAt = DateTimeOffset.UtcNow;
    }
}
