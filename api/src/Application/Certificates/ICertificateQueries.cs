namespace ItCareers.Application.Certificates;

public interface ICertificateQueries
{
    // Public, unauthenticated lookup by verification code — this is the whole point of a
    // certificate: anyone who has the code (e.g. an employer) can confirm it's real.
    Task<CertificateDto?> GetByCodeAsync(string code, CancellationToken cancellationToken = default);
}
