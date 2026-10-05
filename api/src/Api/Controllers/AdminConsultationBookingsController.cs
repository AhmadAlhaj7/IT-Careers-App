using ItCareers.Application.ConsultationBookings;
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

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _commands.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
