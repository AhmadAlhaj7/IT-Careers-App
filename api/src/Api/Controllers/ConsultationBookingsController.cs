using ItCareers.Application.ConsultationBookings;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

[ApiController]
[Route("api/consultation-bookings")]
public class ConsultationBookingsController : ControllerBase
{
    private readonly IConsultationBookingCommands _commands;

    public ConsultationBookingsController(IConsultationBookingCommands commands)
    {
        _commands = commands;
    }

    // Deliberately no [Authorize] — the booking page is a public lead-capture form, open to
    // anyone whether they're signed in or not, same reasoning as CareerQuizController.Submit.
    [HttpPost]
    public async Task<IActionResult> Create(CreateConsultationBookingRequest request, CancellationToken cancellationToken)
    {
        var id = await _commands.CreateAsync(request, cancellationToken);
        return Ok(new { id });
    }
}
