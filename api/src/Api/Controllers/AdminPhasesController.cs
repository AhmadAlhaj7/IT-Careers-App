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

    public AdminPhasesController(IPhaseCommands phaseCommands)
    {
        _phaseCommands = phaseCommands;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreatePhaseRequest request, CancellationToken cancellationToken)
    {
        var id = await _phaseCommands.CreateAsync(request, cancellationToken);
        if (id is null)
        {
            return BadRequest(new { message = "RoadmapId does not refer to an existing roadmap." });
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
