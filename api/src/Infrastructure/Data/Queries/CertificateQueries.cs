using ItCareers.Application.Certificates;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Queries;

public class CertificateQueries : ICertificateQueries
{
    private readonly ItCareersDbContext _context;

    public CertificateQueries(ItCareersDbContext context)
    {
        _context = context;
    }

    public async Task<CertificateDto?> GetByCodeAsync(string code, CancellationToken cancellationToken = default)
    {
        var certificate = await _context.Certificates
            .AsNoTracking()
            .Include(c => c.Roadmap)
            .FirstOrDefaultAsync(c => c.VerificationCode == code, cancellationToken);

        if (certificate?.Roadmap is null)
        {
            return null;
        }

        return new CertificateDto(certificate.LearnerName, certificate.Roadmap.Title, certificate.IssuedAt);
    }
}
