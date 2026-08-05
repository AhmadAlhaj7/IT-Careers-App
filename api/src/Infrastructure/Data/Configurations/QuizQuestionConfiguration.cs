using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ItCareers.Infrastructure.Data.Configurations;

public class QuizQuestionConfiguration : IEntityTypeConfiguration<QuizQuestion>
{
    public void Configure(EntityTypeBuilder<QuizQuestion> builder)
    {
        builder.HasKey(q => q.Id);

        builder.OwnsOne(q => q.Text, text => text.ToJson());

        // Options never need to be queried or joined independently of their question, so they
        // live as a single JSON array column rather than a separate child table.
        builder.OwnsMany(q => q.Options, options =>
        {
            options.ToJson();
            options.OwnsOne(o => o.Text);
        });

        builder.HasOne(q => q.Phase)
            .WithMany(p => p.QuizQuestions)
            .HasForeignKey(q => q.PhaseId);
    }
}
