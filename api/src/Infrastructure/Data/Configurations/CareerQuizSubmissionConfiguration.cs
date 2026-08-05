using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ItCareers.Infrastructure.Data.Configurations;

public class CareerQuizSubmissionConfiguration : IEntityTypeConfiguration<CareerQuizSubmission>
{
    public void Configure(EntityTypeBuilder<CareerQuizSubmission> builder)
    {
        builder.HasKey(s => s.Id);

        builder.OwnsMany(s => s.Answers, answers => answers.ToJson());

        builder.HasOne(s => s.RecommendedTrack)
            .WithMany()
            .HasForeignKey(s => s.RecommendedTrackId);
    }
}
