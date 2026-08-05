using ItCareers.Application.Quizzes;

namespace ItCareers.Application.Roadmaps;

public enum FinalExamAccessStatus
{
    NotFound,
    Locked,
    Granted,
}

// Same shape as PhaseAccessResult, but access is gated purely on enrollment — there's no
// free-preview equivalent for the final exam the way Phase 1 is free.
public record FinalExamAccessResult(FinalExamAccessStatus Status, IReadOnlyList<PublicFinalExamQuestionDto>? Questions);
