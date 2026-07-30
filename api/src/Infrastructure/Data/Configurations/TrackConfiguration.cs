using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ItCareers.Infrastructure.Data.Configurations;

public class TrackConfiguration : IEntityTypeConfiguration<Track>
{
    public void Configure(EntityTypeBuilder<Track> builder)
    {
        builder.HasKey(t => t.Id);

        builder.Property(t => t.Slug).IsRequired();
        builder.HasIndex(t => t.Slug).IsUnique();

        builder.OwnsOne(t => t.Name, name => name.ToJson());
        builder.OwnsOne(t => t.Description, description => description.ToJson());

        builder.HasMany(t => t.Roadmaps)
            .WithOne(r => r.Track)
            .HasForeignKey(r => r.TrackId);
    }
}
