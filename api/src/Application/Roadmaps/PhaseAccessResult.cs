using ItCareers.Domain.Common;

namespace ItCareers.Application.Roadmaps;

public enum PhaseAccessStatus
{
    NotFound,
    Locked,
    Granted,
}

// Locked carries the phase's title (so the public page can still show "Phase 2: X — buy to
// unlock" instead of a bare paywall), Granted carries the full content, NotFound carries neither.
public record PhaseAccessResult(PhaseAccessStatus Status, LocalizedText? Title, PhaseDetailDto? Phase);
