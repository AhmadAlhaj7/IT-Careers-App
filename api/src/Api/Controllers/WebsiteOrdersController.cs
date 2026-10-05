using ItCareers.Application.WebsiteOrders;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

[ApiController]
[Route("api/website-orders")]
public class WebsiteOrdersController : ControllerBase
{
    private readonly IWebsiteOrderCommands _commands;

    public WebsiteOrdersController(IWebsiteOrderCommands commands)
    {
        _commands = commands;
    }

    // Deliberately no [Authorize] — a public lead-capture form, same as ConsultationBookingsController.
    [HttpPost]
    public async Task<IActionResult> Create(CreateWebsiteOrderRequest request, CancellationToken cancellationToken)
    {
        var id = await _commands.CreateAsync(request, cancellationToken);
        return Ok(new { id });
    }
}
