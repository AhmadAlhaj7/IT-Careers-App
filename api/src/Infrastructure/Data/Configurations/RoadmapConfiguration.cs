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
        builder.Property(r => r.OriginalPrice).HasPrecision(10, 2);

        builder.Property(r => r.PaddlePriceId).HasMaxLength(255);

        builder.Property(r => r.Status)
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.OwnsOne(r => r.Title, title => title.ToJson());
        builder.OwnsOne(r => r.Description, description => description.ToJson());
        builder.OwnsOne(r => r.Level, level => level.ToJson());

        // What-you'll-learn bullets — never queried independently of their roadmap, so a
        // single JSON array column, same idiom as CareerQuizSubmission.Answers.
        builder.OwnsMany(r => r.Outcomes, outcomes => outcomes.ToJson());

        builder.HasMany(r => r.Phases)
            .WithOne(p => p.Roadmap)
            .HasForeignKey(p => p.RoadmapId);
    }
}
