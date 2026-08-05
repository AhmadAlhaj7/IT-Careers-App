using ItCareers.Domain.Common;

namespace ItCareers.Application.Analytics;

// EstimatedRevenue, not an exact historical figure — Enrollment doesn't record the price paid
// at purchase time, so this multiplies the roadmap's CURRENT price by its enrollment count.
// Accurate as long as the price hasn't changed since those purchases; flagged clearly in the
// admin UI rather than silently presented as exact.
public record RoadmapSalesDto(LocalizedText RoadmapTitle, int EnrollmentCount, decimal EstimatedRevenue);
