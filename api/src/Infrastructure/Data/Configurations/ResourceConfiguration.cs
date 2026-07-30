using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ItCareers.Infrastructure.Data.Configurations;

public class ResourceConfiguration : IEntityTypeConfiguration<Resource>
{
    public void Configure(EntityTypeBuilder<Resource> builder)
    {
        builder.HasKey(r => r.Id);

        builder.Property(r => r.Url).IsRequired();

        builder.Property(r => r.ResourceType)
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Property(r => r.AccessType)
            .HasConversion<string>()
            .HasMaxLength(10);

        builder.OwnsOne(r => r.Title, title => title.ToJson());
    }
}
