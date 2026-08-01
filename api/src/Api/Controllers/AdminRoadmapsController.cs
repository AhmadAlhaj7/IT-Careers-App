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
    private readonly IAdminRoadmapQueries _roadmapQueries;

    public AdminRoadmapsController(IRoadmapCommands roadmapCommands, IAdminRoadmapQueries roadmapQueries)
    {
        _roadmapCommands = roadmapCommands;
        _roadmapQueries = roadmapQueries;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<AdminRoadmapSummaryDto>>> List(CancellationToken cancellationToken)
    {
        return Ok(await _roadmapQueries.ListRoadmapsAsync(cancellationToken));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<AdminRoadmapDetailDto>> Get(Guid id, CancellationToken cancellationToken)
    {
        var roadmap = await _roadmapQueries.GetRoadmapAsync(id, cancellationToken);
        return roadmap is null ? NotFound() : Ok(roadmap);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateRoadmapRequest request, CancellationToken cancellationToken)
    {
        Guid? id;
        try
        {
            id = await _roadmapCommands.CreateAsync(request, cancellationToken);
        }
        catch (RoadmapSlugConflictException ex)
        {
            return Conflict(new { message = ex.Message });
        }

        if (id is null)
        {
            return BadRequest(new { message = "المسار الرئيسي (Track) المحدد غير موجود." });
        }

        return CreatedAtAction(nameof(Create), new { id }, new { id });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateRoadmapRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var updated = await _roadmapCommands.UpdateAsync(id, request, cancellationToken);
            return updated ? NoContent() : NotFound();
        }
        catch (RoadmapSlugConflictException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _roadmapCommands.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
