using ItCareers.Domain.Common;

namespace ItCareers.Application.Roadmaps;

// What the roadmap landing page shows for every phase except the one being read right
// now — title only, per the spec's "full phase outline, titles visible" (section 4.2).
public record PhaseSummaryDto(int OrderIndex, LocalizedText Title);
