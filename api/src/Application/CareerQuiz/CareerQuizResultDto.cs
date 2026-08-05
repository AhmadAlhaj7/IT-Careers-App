namespace ItCareers.Application.CareerQuiz;

// Sorted highest score first — the frontend shows the top 1-2 as "recommended".
public record CareerQuizResultDto(IReadOnlyList<TrackRecommendationDto> Recommendations);
