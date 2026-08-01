using ItCareers.Application.Roadmaps;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

[ApiController]
[Route("api/admin/phases")]
[Authorize(Roles = "admin")]
public class AdminPhasesController : ControllerBase
{
    private readonly IPhaseCommands _phaseCommands;
    private readonly IAdminRoadmapQueries _roadmapQueries;

    public AdminPhasesController(IPhaseCommands phaseCommands, IAdminRoadmapQueries roadmapQueries)
    {
        _phaseCommands = phaseCommands;
        _roadmapQueries = roadmapQueries;
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<AdminPhaseDetailDto>> Get(Guid id, CancellationToken cancellationToken)
    {
        var phase = await _roadmapQueries.GetPhaseAsync(id, cancellationToken);
        return phase is null ? NotFound() : Ok(phase);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreatePhaseRequest request, CancellationToken cancellationToken)
    {
        var id = await _phaseCommands.CreateAsync(request, cancellationToken);
        if (id is null)
        {
            return BadRequest(new { message = "المسار المحدد غير موجود." });
        }

        return CreatedAtAction(nameof(Create), new { id }, new { id });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdatePhaseRequest request, CancellationToken cancellationToken)
    {
        var updated = await _phaseCommands.UpdateAsync(id, request, cancellationToken);
        return updated ? NoContent() : NotFound();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _phaseCommands.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
