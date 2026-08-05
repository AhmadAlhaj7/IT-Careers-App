using ItCareers.Domain.Common;

namespace ItCareers.Application.Analytics;

// RecommendationCount only counts submissions tied to a signed-in user — an anonymous
// submission can never be linked to a later purchase, so it can't contribute to a
// recommendation-to-purchase conversion rate.
public record TrackConversionDto(LocalizedText TrackName, int RecommendationCount, int ConvertedCount, double ConversionRate);
