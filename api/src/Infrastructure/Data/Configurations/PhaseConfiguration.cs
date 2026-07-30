using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ItCareers.Infrastructure.Data.Configurations;

public class PhaseConfiguration : IEntityTypeConfiguration<Phase>
{
    public void Configure(EntityTypeBuilder<Phase> builder)
    {
        builder.HasKey(p => p.Id);

        builder.Property(p => p.PhaseType)
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.OwnsOne(p => p.Title, title => title.ToJson());
        builder.OwnsOne(p => p.Explanation, explanation => explanation.ToJson());

        builder.HasMany(p => p.Resources)
            .WithOne(r => r.Phase)
            .HasForeignKey(r => r.PhaseId);

        builder.HasMany(p => p.Projects)
            .WithOne(pr => pr.Phase)
            .HasForeignKey(pr => pr.PhaseId);
    }
}
