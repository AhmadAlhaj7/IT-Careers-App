using ItCareers.Domain.Common;

namespace ItCareers.Application.Roadmaps;

// Where a phase stands for the specific visitor asking — Locked until the roadmap is
// purchased and prior phases are done, Current for the next one up, Completed once its
// PhaseCompletion row exists. Computed server-side so the frontend never has to re-derive it.
public enum PhaseProgressStatus
{
    Locked,
    Current,
    Completed,
}

// What the roadmap landing page shows for every phase — enough to render the outline and
// timeline without a follow-up request per phase.
public record PhaseSummaryDto(
    int OrderIndex,
    LocalizedText Title,
    LocalizedText? Tag,
    LocalizedText Summary,
    IReadOnlyList<string> Skills,
    int ResourceCount,
    int ProjectCount,
    bool HasQuiz,
    PhaseProgressStatus Status);
