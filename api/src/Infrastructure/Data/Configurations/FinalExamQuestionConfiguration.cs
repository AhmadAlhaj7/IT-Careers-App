using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ItCareers.Infrastructure.Data.Configurations;

public class FinalExamQuestionConfiguration : IEntityTypeConfiguration<FinalExamQuestion>
{
    public void Configure(EntityTypeBuilder<FinalExamQuestion> builder)
    {
        builder.HasKey(q => q.Id);

        builder.OwnsOne(q => q.Text, text => text.ToJson());

        builder.OwnsMany(q => q.Options, options =>
        {
            options.ToJson();
            options.OwnsOne(o => o.Text);
        });

        builder.HasOne(q => q.Roadmap)
            .WithMany(r => r.FinalExamQuestions)
            .HasForeignKey(q => q.RoadmapId);
    }
}
