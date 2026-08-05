using ItCareers.Domain.Common;

namespace ItCareers.Application.CareerQuiz;

public record UpdateCareerQuizQuestionRequest(LocalizedText Text, int OrderIndex, IReadOnlyList<CareerQuizOptionInput> Options);
