using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ItCareers.Infrastructure.Data.Configurations;

public class SpecializationConfiguration : IEntityTypeConfiguration<Specialization>
{
    public void Configure(EntityTypeBuilder<Specialization> builder)
    {
        builder.HasKey(s => s.Id);

        builder.Property(s => s.Slug).IsRequired();
        builder.HasIndex(s => s.Slug).IsUnique();

        builder.Property(s => s.Category).HasConversion<string>().HasMaxLength(20);
        builder.Property(s => s.DemandLevel).HasConversion<string>().HasMaxLength(20);
        builder.Property(s => s.Status).HasConversion<string>().HasMaxLength(20);

        builder.OwnsOne(s => s.Name, name => name.ToJson());
        builder.OwnsOne(s => s.CardSentence, sentence => sentence.ToJson());
        builder.OwnsOne(s => s.Summary, summary => summary.ToJson());
        builder.OwnsOne(s => s.DemandQuickFact, fact => fact.ToJson());
        builder.OwnsOne(s => s.SalaryQuickFact, fact => fact.ToJson());
        builder.OwnsOne(s => s.TimeToJobQuickFact, fact => fact.ToJson());
        builder.OwnsOne(s => s.DifficultyQuickFact, fact => fact.ToJson());
        builder.OwnsOne(s => s.IntroVideoCaption, caption => caption.ToJson());
        builder.OwnsOne(s => s.RoadmapButtonText, text => text.ToJson());

        // Nested owned collections (each section carries its own list of items) — same JSON
        // idiom as QuizQuestion.Options: every LocalizedText property nested inside an owned
        // collection needs its own explicit OwnsOne(...), or EF can't bind it as JSON.
        builder.OwnsMany(s => s.Sections, sections =>
        {
            sections.ToJson();
            sections.OwnsOne(sec => sec.Title);
            sections.OwnsOne(sec => sec.Body);
            sections.OwnsOne(sec => sec.ImageCaption);
            sections.OwnsMany(sec => sec.Items, items =>
            {
                items.OwnsOne(i => i.Title);
                items.OwnsOne(i => i.Body);
            });
        });

        builder.OwnsMany(s => s.Faqs, faqs =>
        {
            faqs.ToJson();
            faqs.OwnsOne(f => f.Question);
            faqs.OwnsOne(f => f.Answer);
        });
    }
}
