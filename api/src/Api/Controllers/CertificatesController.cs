using ItCareers.Application.Certificates;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

[ApiController]
[Route("api/certificates")]
public class CertificatesController : ControllerBase
{
    private readonly ICertificateQueries _certificateQueries;

    public CertificatesController(ICertificateQueries certificateQueries)
    {
        _certificateQueries = certificateQueries;
    }

    [HttpGet("{code}")]
    public async Task<ActionResult<CertificateDto>> GetByCode(string code, CancellationToken cancellationToken)
    {
        var certificate = await _certificateQueries.GetByCodeAsync(code, cancellationToken);
        return certificate is null ? NotFound() : Ok(certificate);
    }
}
