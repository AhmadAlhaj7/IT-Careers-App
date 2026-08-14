namespace ItCareers.Domain.Enums;

// Kept separate from RoadmapStatus even though the values match today — a different
// aggregate, free to diverge later (e.g. a specialization could gain a review/pending state
// without touching roadmaps).
public enum SpecializationStatus
{
    Draft,
    Published,
}
