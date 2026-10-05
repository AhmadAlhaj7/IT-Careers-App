using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ItCareers.Infrastructure.Data.Configurations;

public class WebsiteOrderConfiguration : IEntityTypeConfiguration<WebsiteOrder>
{
    public void Configure(EntityTypeBuilder<WebsiteOrder> builder)
    {
        builder.HasKey(o => o.Id);

        builder.Property(o => o.FullName).HasMaxLength(200).IsRequired();
        builder.Property(o => o.Phone).HasMaxLength(40).IsRequired();
        builder.Property(o => o.Email).HasMaxLength(320).IsRequired();
        builder.Property(o => o.ProjectName).HasMaxLength(200).IsRequired();
        builder.Property(o => o.WebsiteType).HasMaxLength(40).IsRequired();
        builder.Property(o => o.Description).HasMaxLength(2000).IsRequired();
        builder.Property(o => o.PreferredContactTime).HasMaxLength(200).IsRequired();
    }
}
