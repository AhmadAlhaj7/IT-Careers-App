using ItCareers.Application.Roadmaps;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

[ApiController]
[Route("api/roadmaps")]
public class RoadmapsController : ControllerBase
{
    private readonly IRoadmapQueries _roadmapQueries;

    public RoadmapsController(IRoadmapQueries roadmapQueries)
    {
        _roadmapQueries = roadmapQueries;
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<RoadmapDetailDto>> GetBySlug(string slug, CancellationToken cancellationToken)
    {
        var roadmap = await _roadmapQueries.GetBySlugAsync(slug, cancellationToken);
        return roadmap is null ? NotFound() : Ok(roadmap);
    }

    [HttpGet("{slug}/phases/{orderIndex:int}")]
    public async Task<ActionResult<PhaseDetailDto>> GetPhase(
        string slug,
        int orderIndex,
        CancellationToken cancellationToken)
    {
        var phase = await _roadmapQueries.GetPhaseAsync(slug, orderIndex, cancellationToken);
        return phase is null ? NotFound() : Ok(phase);
    }
}
