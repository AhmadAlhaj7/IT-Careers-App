using ItCareers.Application.Roadmaps;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

// Read-only: Tracks are seed-only for now, there's exactly one at launch. This exists so
// the admin "create roadmap" form has something to populate its Track dropdown from.
[ApiController]
[Route("api/admin/tracks")]
[Authorize(Roles = "admin")]
public class AdminTracksController : ControllerBase
{
    private readonly IAdminRoadmapQueries _roadmapQueries;

    public AdminTracksController(IAdminRoadmapQueries roadmapQueries)
    {
        _roadmapQueries = roadmapQueries;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<TrackSummaryDto>>> List(CancellationToken cancellationToken)
    {
        return Ok(await _roadmapQueries.ListTracksAsync(cancellationToken));
    }
}
