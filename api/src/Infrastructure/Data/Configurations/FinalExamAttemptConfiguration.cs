using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ItCareers.Infrastructure.Data.Configurations;

public class FinalExamAttemptConfiguration : IEntityTypeConfiguration<FinalExamAttempt>
{
    public void Configure(EntityTypeBuilder<FinalExamAttempt> builder)
    {
        builder.HasKey(a => a.Id);

        builder.Property(a => a.UserId).IsRequired();

        builder.HasOne(a => a.Roadmap)
            .WithMany()
            .HasForeignKey(a => a.RoadmapId);
    }
}
