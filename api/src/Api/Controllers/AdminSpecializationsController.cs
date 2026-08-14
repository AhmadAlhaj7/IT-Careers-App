using ItCareers.Application.Specializations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

[ApiController]
[Route("api/admin/specializations")]
[Authorize(Roles = "admin")]
public class AdminSpecializationsController : ControllerBase
{
    private readonly ISpecializationCommands _specializationCommands;
    private readonly IAdminSpecializationQueries _specializationQueries;

    public AdminSpecializationsController(ISpecializationCommands specializationCommands, IAdminSpecializationQueries specializationQueries)
    {
        _specializationCommands = specializationCommands;
        _specializationQueries = specializationQueries;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<AdminSpecializationSummaryDto>>> List(CancellationToken cancellationToken)
    {
        return Ok(await _specializationQueries.ListSpecializationsAsync(cancellationToken));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<AdminSpecializationDetailDto>> Get(Guid id, CancellationToken cancellationToken)
    {
        var specialization = await _specializationQueries.GetSpecializationAsync(id, cancellationToken);
        return specialization is null ? NotFound() : Ok(specialization);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateSpecializationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var id = await _specializationCommands.CreateAsync(request, cancellationToken);
            return CreatedAtAction(nameof(Create), new { id }, new { id });
        }
        catch (SpecializationSlugConflictException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateSpecializationRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var updated = await _specializationCommands.UpdateAsync(id, request, cancellationToken);
            return updated ? NoContent() : NotFound();
        }
        catch (SpecializationSlugConflictException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _specializationCommands.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
