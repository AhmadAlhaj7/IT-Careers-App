namespace ItCareers.Application.Quizzes;

public record FinalExamResultDto(int CorrectCount, int TotalCount, bool Passed, string? CertificateCode);
