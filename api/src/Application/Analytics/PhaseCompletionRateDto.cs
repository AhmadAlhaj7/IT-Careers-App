using ItCareers.Domain.Common;

namespace ItCareers.Application.Analytics;

// EnrolledCount is the roadmap's total paying-learner cohort (not "everyone who ever viewed
// this phase") — free Phase-1 previewers who never bought are deliberately excluded, so this
// reads as "of the people who paid, how many made it this far."
public record PhaseCompletionRateDto(
    LocalizedText RoadmapTitle,
    int PhaseOrderIndex,
    LocalizedText PhaseTitle,
    int EnrolledCount,
    int CompletedCount,
    double CompletionRate);
