using ItCareers.Application.Specializations;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

// Deliberately no [Authorize] anywhere — this content exists specifically to help an
// anonymous, undecided visitor before they've bought (or signed up for) anything.
[ApiController]
[Route("api/specializations")]
public class SpecializationsController : ControllerBase
{
    private readonly ISpecializationQueries _specializationQueries;

    public SpecializationsController(ISpecializationQueries specializationQueries)
    {
        _specializationQueries = specializationQueries;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<SpecializationSummaryDto>>> List(CancellationToken cancellationToken)
    {
        return Ok(await _specializationQueries.ListPublishedAsync(cancellationToken));
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<SpecializationDetailDto>> GetBySlug(string slug, CancellationToken cancellationToken)
    {
        var specialization = await _specializationQueries.GetBySlugAsync(slug, cancellationToken);
        return specialization is null ? NotFound() : Ok(specialization);
    }
}
