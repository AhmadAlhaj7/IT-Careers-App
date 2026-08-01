using ItCareers.Application.Roadmaps;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

[ApiController]
[Route("api/admin/roadmaps")]
[Authorize(Roles = "admin")]
public class AdminRoadmapsController : ControllerBase
{
    private readonly IRoadmapCommands _roadmapCommands;

    public AdminRoadmapsController(IRoadmapCommands roadmapCommands)
    {
        _roadmapCommands = roadmapCommands;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateRoadmapRequest request, CancellationToken cancellationToken)
    {
        var id = await _roadmapCommands.CreateAsync(request, cancellationToken);
        if (id is null)
        {
            return BadRequest(new { message = "TrackId does not refer to an existing track." });
        }

        return CreatedAtAction(nameof(Create), new { id }, new { id });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateRoadmapRequest request, CancellationToken cancellationToken)
    {
        var updated = await _roadmapCommands.UpdateAsync(id, request, cancellationToken);
        return updated ? NoContent() : NotFound();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _roadmapCommands.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
