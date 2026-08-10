namespace ItCareers.Application.Analytics;

public record AdminAnalyticsDto(
    int TotalLearners,
    int TotalEnrollments,
    decimal EstimatedRevenue,
    int NewEnrollmentsThisWeek,
    int CertificatesIssuedThisWeek,
    IReadOnlyList<RoadmapSalesDto> RoadmapSales,
    IReadOnlyList<PhaseCompletionRateDto> PhaseCompletionRates,
    IReadOnlyList<TrackConversionDto> TrackConversions);
