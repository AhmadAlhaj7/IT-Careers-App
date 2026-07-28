using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data;

// No DbSet properties yet — no Domain entities exist until Slice 1. This class exists now
// so the EF Core + Npgsql + migrations pipeline can be proven end to end before real tables arrive.
public class ItCareersDbContext : DbContext
{
    public ItCareersDbContext(DbContextOptions<ItCareersDbContext> options)
        : base(options)
    {
    }
}
