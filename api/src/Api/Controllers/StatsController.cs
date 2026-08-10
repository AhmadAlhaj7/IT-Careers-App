using ItCareers.Application.Analytics;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

// Public, no auth — deliberately a small, safe subset (see PublicStatsDto) separate from
// AdminAnalyticsController, which carries sensitive per-roadmap revenue figures.
[ApiController]
[Route("api/stats")]
public class StatsController : ControllerBase
{
    private readonly IPublicStatsQueries _statsQueries;

    public StatsController(IPublicStatsQueries statsQueries)
    {
        _statsQueries = statsQueries;
    }

    [HttpGet]
    public async Task<ActionResult<PublicStatsDto>> Get(CancellationToken cancellationToken)
    {
        return Ok(await _statsQueries.GetAsync(cancellationToken));
    }
}
