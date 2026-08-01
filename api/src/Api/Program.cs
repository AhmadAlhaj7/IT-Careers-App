using System.Security.Claims;
using System.Text.Json.Serialization;
using ItCareers.Application.Roadmaps;
using ItCareers.Infrastructure.Data;
using ItCareers.Infrastructure.Data.Commands;
using ItCareers.Infrastructure.Data.Queries;
using ItCareers.Infrastructure.Data.Seeding;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    // Enum values as readable strings ("Free", not "0") — much easier for the frontend
    // to work with, and self-explanatory when inspecting a response by eye.
    .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<ItCareersDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddScoped<IRoadmapQueries, RoadmapQueries>();
builder.Services.AddScoped<IAdminRoadmapQueries, AdminRoadmapQueries>();
builder.Services.AddScoped<IRoadmapCommands, RoadmapCommands>();
builder.Services.AddScoped<IPhaseCommands, PhaseCommands>();
builder.Services.AddScoped<IResourceCommands, ResourceCommands>();
builder.Services.AddScoped<IProjectCommands, ProjectCommands>();

builder.Services.AddHealthChecks()
    .AddDbContextCheck<ItCareersDbContext>();

// Clerk issues the tokens; we only ever verify them here — this app never sees a
// password. Authority points at Clerk's per-instance issuer, which ASP.NET Core uses
// to fetch Clerk's public signing keys (JWKS) and check a token's signature and expiry.
var authorizedParties = builder.Configuration.GetSection("Clerk:AuthorizedParties").Get<string[]>() ?? [];

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["Clerk:Authority"];
        options.MapInboundClaims = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false,
        };
        options.Events = new JwtBearerEvents
        {
            // Clerk's own recommendation: without this, any frontend holding a valid
            // Clerk token — not just ours — could call our API. "azp" is the origin
            // the token was actually issued to.
            OnTokenValidated = context =>
            {
                var azp = context.Principal?.FindFirst("azp")?.Value;
                if (azp is not null && !authorizedParties.Contains(azp))
                {
                    context.Fail("Token was not issued to an authorized party.");
                    return Task.CompletedTask;
                }

                // Clerk carries our custom "role" claim as a plain string (configured in
                // Clerk's session token settings) — map it onto the standard .NET role
                // claim type so [Authorize(Roles = "Admin")] works the normal way below.
                var role = context.Principal?.FindFirst("role")?.Value;
                if (!string.IsNullOrEmpty(role) && context.Principal?.Identity is ClaimsIdentity identity)
                {
                    identity.AddClaim(new Claim(ClaimTypes.Role, role));
                }

                return Task.CompletedTask;
            },
        };
    });

builder.Services.AddAuthorization();

// Railway (and most hosts) terminate HTTPS at a reverse proxy, then talk to this
// container over plain HTTP. Without this, UseHttpsRedirection() below would think
// every request is HTTP and redirect forever. KnownIPNetworks/KnownProxies are cleared
// because the container is never reachable except through that trusted proxy.
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.KnownIPNetworks.Clear();
    options.KnownProxies.Clear();
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ItCareersDbContext>();
    dbContext.Database.Migrate();
    await CatalogSeeder.SeedAsync(dbContext);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseForwardedHeaders();
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHealthChecks("/health");

app.Run();
