using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ItCareers.Infrastructure.Data.Configurations;

public class EnrollmentConfiguration : IEntityTypeConfiguration<Enrollment>
{
    public void Configure(EntityTypeBuilder<Enrollment> builder)
    {
        builder.HasKey(e => e.Id);

        builder.Property(e => e.UserId).IsRequired();
        builder.Property(e => e.PaddleTransactionId).IsRequired();

        // Paddle retries webhook delivery on transient failures — this unique index is what
        // makes re-processing the same transaction id a safe no-op instead of a duplicate charge.
        builder.HasIndex(e => e.PaddleTransactionId).IsUnique();

        // One enrollment per user per roadmap: buying the same roadmap twice shouldn't happen.
        builder.HasIndex(e => new { e.UserId, e.RoadmapId }).IsUnique();

        builder.HasOne(e => e.Roadmap)
            .WithMany()
            .HasForeignKey(e => e.RoadmapId);
    }
}
