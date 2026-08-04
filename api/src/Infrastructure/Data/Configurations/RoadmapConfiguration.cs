using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ItCareers.Infrastructure.Data.Configurations;

public class RoadmapConfiguration : IEntityTypeConfiguration<Roadmap>
{
    public void Configure(EntityTypeBuilder<Roadmap> builder)
    {
        builder.HasKey(r => r.Id);

        builder.Property(r => r.Slug).IsRequired();
        builder.HasIndex(r => r.Slug).IsUnique();

        builder.Property(r => r.Price).HasPrecision(10, 2);

        builder.Property(r => r.PaddlePriceId).HasMaxLength(255);

        builder.Property(r => r.Status)
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.OwnsOne(r => r.Title, title => title.ToJson());

        builder.HasMany(r => r.Phases)
            .WithOne(p => p.Roadmap)
            .HasForeignKey(p => p.RoadmapId);
    }
}
