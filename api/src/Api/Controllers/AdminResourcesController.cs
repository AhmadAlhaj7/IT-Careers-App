using ItCareers.Application.Roadmaps;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

[ApiController]
[Route("api/admin/resources")]
[Authorize(Roles = "admin")]
public class AdminResourcesController : ControllerBase
{
    private readonly IResourceCommands _resourceCommands;

    public AdminResourcesController(IResourceCommands resourceCommands)
    {
        _resourceCommands = resourceCommands;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateResourceRequest request, CancellationToken cancellationToken)
    {
        var id = await _resourceCommands.CreateAsync(request, cancellationToken);
        if (id is null)
        {
            return BadRequest(new { message = "PhaseId does not refer to an existing phase." });
        }

        return CreatedAtAction(nameof(Create), new { id }, new { id });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateResourceRequest request, CancellationToken cancellationToken)
    {
        var updated = await _resourceCommands.UpdateAsync(id, request, cancellationToken);
        return updated ? NoContent() : NotFound();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _resourceCommands.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
