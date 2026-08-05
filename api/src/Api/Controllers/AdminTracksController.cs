using ItCareers.Application.Tracks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

[ApiController]
[Route("api/admin/tracks")]
[Authorize(Roles = "admin")]
public class AdminTracksController : ControllerBase
{
    private readonly IAdminTrackQueries _trackQueries;
    private readonly ITrackCommands _trackCommands;

    public AdminTracksController(IAdminTrackQueries trackQueries, ITrackCommands trackCommands)
    {
        _trackQueries = trackQueries;
        _trackCommands = trackCommands;
    }

    // Also doubles as the "create roadmap" form's Track dropdown source.
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<AdminTrackDto>>> List(CancellationToken cancellationToken)
    {
        return Ok(await _trackQueries.ListAsync(cancellationToken));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<AdminTrackDto>> Get(Guid id, CancellationToken cancellationToken)
    {
        var track = await _trackQueries.GetByIdAsync(id, cancellationToken);
        return track is null ? NotFound() : Ok(track);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateTrackRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var id = await _trackCommands.CreateAsync(request, cancellationToken);
            return CreatedAtAction(nameof(Get), new { id }, new { id });
        }
        catch (TrackSlugConflictException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateTrackRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var updated = await _trackCommands.UpdateAsync(id, request, cancellationToken);
            return updated ? NoContent() : NotFound();
        }
        catch (TrackSlugConflictException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        try
        {
            var deleted = await _trackCommands.DeleteAsync(id, cancellationToken);
            return deleted ? NoContent() : NotFound();
        }
        catch (TrackHasRoadmapsException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }
}
