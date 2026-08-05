namespace ItCareers.Application.Analytics;

public record AdminAnalyticsDto(
    int TotalLearners,
    int TotalEnrollments,
    decimal EstimatedRevenue,
    IReadOnlyList<RoadmapSalesDto> RoadmapSales,
    IReadOnlyList<PhaseCompletionRateDto> PhaseCompletionRates,
    IReadOnlyList<TrackConversionDto> TrackConversions);
