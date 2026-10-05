using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ItCareers.Infrastructure.Data.Configurations;

public class ConsultationBookingConfiguration : IEntityTypeConfiguration<ConsultationBooking>
{
    public void Configure(EntityTypeBuilder<ConsultationBooking> builder)
    {
        builder.HasKey(b => b.Id);

        builder.Property(b => b.FullName).HasMaxLength(200).IsRequired();
        builder.Property(b => b.Phone).HasMaxLength(40).IsRequired();
        builder.Property(b => b.Email).HasMaxLength(320).IsRequired();
        builder.Property(b => b.WebsiteIdea).HasMaxLength(2000).IsRequired();
        builder.Property(b => b.PreferredContactTime).HasMaxLength(200).IsRequired();
    }
}
