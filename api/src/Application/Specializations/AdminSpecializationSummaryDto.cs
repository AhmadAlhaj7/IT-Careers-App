using ItCareers.Domain.Common;
using ItCareers.Domain.Enums;

namespace ItCareers.Application.Specializations;

// Total section count is always 9 (the fixed set) — the admin list computes "N من 9" from
// EnabledSectionCount alone, no need to carry the total over the wire.
public record AdminSpecializationSummaryDto(
    Guid Id,
    string Slug,
    LocalizedText Name,
    SpecializationStatus Status,
    SpecializationCategory Category,
    int EnabledSectionCount,
    string? LinkedRoadmapTitleAr,
    DateTimeOffset UpdatedAt);
