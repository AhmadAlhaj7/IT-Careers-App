using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ItCareers.Infrastructure.Data.Configurations;

public class CertificateConfiguration : IEntityTypeConfiguration<Certificate>
{
    public void Configure(EntityTypeBuilder<Certificate> builder)
    {
        builder.HasKey(c => c.Id);

        builder.Property(c => c.UserId).IsRequired();
        builder.Property(c => c.LearnerName).IsRequired();
        builder.Property(c => c.VerificationCode).IsRequired();

        // At most one certificate per learner per roadmap.
        builder.HasIndex(c => new { c.UserId, c.RoadmapId }).IsUnique();

        // The public verification URL is /certificates/{code} — this is what makes that
        // lookup unambiguous and makes codes effectively unguessable in sequence.
        builder.HasIndex(c => c.VerificationCode).IsUnique();

        builder.HasOne(c => c.Roadmap)
            .WithMany()
            .HasForeignKey(c => c.RoadmapId);
    }
}
