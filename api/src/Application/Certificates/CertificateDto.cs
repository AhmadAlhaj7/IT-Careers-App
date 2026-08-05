using ItCareers.Domain.Common;

namespace ItCareers.Application.Certificates;

public record CertificateDto(string LearnerName, LocalizedText RoadmapTitle, DateTimeOffset IssuedAt);
