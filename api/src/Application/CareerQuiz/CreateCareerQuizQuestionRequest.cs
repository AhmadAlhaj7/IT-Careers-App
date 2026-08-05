using ItCareers.Domain.Common;

namespace ItCareers.Application.CareerQuiz;

public record CreateCareerQuizQuestionRequest(LocalizedText Text, int OrderIndex, IReadOnlyList<CareerQuizOptionInput> Options);
