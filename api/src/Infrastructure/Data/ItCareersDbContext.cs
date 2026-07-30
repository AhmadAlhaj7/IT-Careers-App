using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data;

public class ItCareersDbContext : DbContext
{
    public DbSet<Track> Tracks => Set<Track>();
    public DbSet<Roadmap> Roadmaps => Set<Roadmap>();
    public DbSet<Phase> Phases => Set<Phase>();
    public DbSet<Resource> Resources => Set<Resource>();
    public DbSet<Project> Projects => Set<Project>();

    public ItCareersDbContext(DbContextOptions<ItCareersDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ItCareersDbContext).Assembly);
    }
}
