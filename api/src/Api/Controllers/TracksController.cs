using ItCareers.Application.Tracks;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

[ApiController]
[Route("api/tracks")]
public class TracksController : ControllerBase
{
    private readonly ITrackQueries _trackQueries;

    public TracksController(ITrackQueries trackQueries)
    {
        _trackQueries = trackQueries;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<TrackListItemDto>>> List(CancellationToken cancellationToken)
    {
        return Ok(await _trackQueries.ListPublishedAsync(cancellationToken));
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<TrackDetailDto>> GetBySlug(string slug, CancellationToken cancellationToken)
    {
        var track = await _trackQueries.GetBySlugAsync(slug, cancellationToken);
        return track is null ? NotFound() : Ok(track);
    }
}
