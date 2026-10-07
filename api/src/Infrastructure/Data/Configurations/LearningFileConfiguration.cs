using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ItCareers.Infrastructure.Data.Configurations;

public class LearningFileConfiguration : IEntityTypeConfiguration<LearningFile>
{
    public void Configure(EntityTypeBuilder<LearningFile> builder)
    {
        builder.HasKey(f => f.Id);

        builder.OwnsOne(f => f.Title, title => title.ToJson());
        builder.OwnsOne(f => f.Description, description => description.ToJson());
        builder.OwnsOne(f => f.Category, category => category.ToJson());

        builder.Property(f => f.FileName).HasMaxLength(255).IsRequired();
        builder.Property(f => f.ContentType).HasMaxLength(150).IsRequired();
    }
}

public class LearningFileContentConfiguration : IEntityTypeConfiguration<LearningFileContent>
{
    public void Configure(EntityTypeBuilder<LearningFileContent> builder)
    {
        builder.HasKey(c => c.LearningFileId);

        builder.Property(c => c.Bytes).IsRequired();

        builder.HasOne<LearningFile>()
            .WithOne()
            .HasForeignKey<LearningFileContent>(c => c.LearningFileId);
    }
}
