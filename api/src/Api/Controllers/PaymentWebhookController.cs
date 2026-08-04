using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using ItCareers.Application.Enrollments;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

// The only place a purchase is ever confirmed — never trust a client-reported "I paid".
// Deliberately unauthenticated (Paddle calls this server-to-server, no Clerk token involved);
// authenticity instead comes from verifying Paddle's own HMAC signature on every request.
[ApiController]
[Route("api/webhooks/payment")]
public class PaymentWebhookController : ControllerBase
{
    private readonly IEnrollmentCommands _enrollmentCommands;
    private readonly IConfiguration _configuration;

    public PaymentWebhookController(IEnrollmentCommands enrollmentCommands, IConfiguration configuration)
    {
        _enrollmentCommands = enrollmentCommands;
        _configuration = configuration;
    }

    [HttpPost]
    public async Task<IActionResult> Handle(CancellationToken cancellationToken)
    {
        using var reader = new StreamReader(Request.Body);
        var rawBody = await reader.ReadToEndAsync(cancellationToken);

        var webhookSecret = _configuration["Paddle:WebhookSecret"];
        if (string.IsNullOrEmpty(webhookSecret)
            || !Request.Headers.TryGetValue("Paddle-Signature", out var signatureHeader)
            || !IsValidSignature(rawBody, signatureHeader.ToString(), webhookSecret))
        {
            return Unauthorized();
        }

        using var document = JsonDocument.Parse(rawBody);
        var root = document.RootElement;

        // Only a completed transaction ever grants access. Any other event type is
        // acknowledged (200) so Paddle doesn't keep retrying it, but otherwise ignored.
        if (root.GetProperty("event_type").GetString() != "transaction.completed")
        {
            return Ok();
        }

        var data = root.GetProperty("data");
        var transactionId = data.GetProperty("id").GetString()!;
        var customData = data.GetProperty("custom_data");
        var roadmapId = Guid.Parse(customData.GetProperty("roadmapId").GetString()!);
        var userId = customData.GetProperty("userId").GetString()!;

        await _enrollmentCommands.EnsureEnrollmentAsync(userId, roadmapId, transactionId, cancellationToken);

        return Ok();
    }

    // Paddle-Signature header looks like "ts=1234567890;h1=<hex hmac>". The signed payload is
    // "{ts}:{raw request body}", HMAC-SHA256'd with the webhook secret from Paddle's dashboard.
    private static bool IsValidSignature(string rawBody, string signatureHeader, string secret)
    {
        var parts = signatureHeader
            .Split(';')
            .Select(part => part.Split('=', 2))
            .Where(part => part.Length == 2)
            .ToDictionary(part => part[0], part => part[1]);

        if (!parts.TryGetValue("ts", out var timestamp) || !parts.TryGetValue("h1", out var providedHash))
        {
            return false;
        }

        var signedPayload = $"{timestamp}:{rawBody}";
        using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secret));
        var computedHash = Convert.ToHexStringLower(hmac.ComputeHash(Encoding.UTF8.GetBytes(signedPayload)));

        return CryptographicOperations.FixedTimeEquals(
            Encoding.UTF8.GetBytes(computedHash),
            Encoding.UTF8.GetBytes(providedHash));
    }
}
