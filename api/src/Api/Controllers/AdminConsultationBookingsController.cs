using ItCareers.Application.ConsultationBookings;
using ItCareers.Application.Leads;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

[ApiController]
[Route("api/admin/consultation-bookings")]
[Authorize(Roles = "admin")]
public class AdminConsultationBookingsController : ControllerBase
{
    private readonly IAdminConsultationBookingQueries _queries;
    private readonly IConsultationBookingCommands _commands;

    public AdminConsultationBookingsController(IAdminConsultationBookingQueries queries, IConsultationBookingCommands commands)
    {
        _queries = queries;
        _commands = commands;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<AdminConsultationBookingDto>>> List(CancellationToken cancellationToken)
    {
        return Ok(await _queries.ListAsync(cancellationToken));
    }

    [HttpPut("{id:guid}/status")]
    public async Task<IActionResult> ChangeStatus(Guid id, ChangeLeadStatusRequest request, CancellationToken cancellationToken)
    {
        var changed = await _commands.ChangeStatusAsync(id, request.Status, cancellationToken);
        return changed ? NoContent() : NotFound();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _commands.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
