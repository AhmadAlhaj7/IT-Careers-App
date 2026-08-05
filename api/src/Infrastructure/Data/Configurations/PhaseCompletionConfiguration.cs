using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ItCareers.Infrastructure.Data.Configurations;

public class PhaseCompletionConfiguration : IEntityTypeConfiguration<PhaseCompletion>
{
    public void Configure(EntityTypeBuilder<PhaseCompletion> builder)
    {
        builder.HasKey(c => c.Id);

        builder.Property(c => c.UserId).IsRequired();

        // Idempotent completion: retaking and re-passing a quiz shouldn't create a second row.
        builder.HasIndex(c => new { c.UserId, c.PhaseId }).IsUnique();

        builder.HasOne(c => c.Phase)
            .WithMany()
            .HasForeignKey(c => c.PhaseId);
    }
}
