using ItCareers.Application.Analytics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

[ApiController]
[Route("api/admin/analytics")]
[Authorize(Roles = "admin")]
public class AdminAnalyticsController : ControllerBase
{
    private readonly IAdminAnalyticsQueries _analyticsQueries;

    public AdminAnalyticsController(IAdminAnalyticsQueries analyticsQueries)
    {
        _analyticsQueries = analyticsQueries;
    }

    [HttpGet]
    public async Task<ActionResult<AdminAnalyticsDto>> Get(CancellationToken cancellationToken)
    {
        return Ok(await _analyticsQueries.GetAsync(cancellationToken));
    }
}
