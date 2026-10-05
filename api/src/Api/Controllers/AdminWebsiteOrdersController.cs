using ItCareers.Application.WebsiteOrders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

[ApiController]
[Route("api/admin/website-orders")]
[Authorize(Roles = "admin")]
public class AdminWebsiteOrdersController : ControllerBase
{
    private readonly IAdminWebsiteOrderQueries _queries;
    private readonly IWebsiteOrderCommands _commands;

    public AdminWebsiteOrdersController(IAdminWebsiteOrderQueries queries, IWebsiteOrderCommands commands)
    {
        _queries = queries;
        _commands = commands;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<AdminWebsiteOrderDto>>> List(CancellationToken cancellationToken)
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
