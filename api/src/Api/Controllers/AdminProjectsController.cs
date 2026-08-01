using ItCareers.Application.Roadmaps;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

[ApiController]
[Route("api/admin/projects")]
[Authorize(Roles = "admin")]
public class AdminProjectsController : ControllerBase
{
    private readonly IProjectCommands _projectCommands;

    public AdminProjectsController(IProjectCommands projectCommands)
    {
        _projectCommands = projectCommands;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateProjectRequest request, CancellationToken cancellationToken)
    {
        var id = await _projectCommands.CreateAsync(request, cancellationToken);
        if (id is null)
        {
            return BadRequest(new { message = "المرحلة المحددة غير موجودة." });
        }

        return CreatedAtAction(nameof(Create), new { id }, new { id });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateProjectRequest request, CancellationToken cancellationToken)
    {
        var updated = await _projectCommands.UpdateAsync(id, request, cancellationToken);
        return updated ? NoContent() : NotFound();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _projectCommands.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
