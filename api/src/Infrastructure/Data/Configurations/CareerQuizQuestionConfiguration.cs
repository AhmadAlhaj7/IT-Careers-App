using ItCareers.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ItCareers.Infrastructure.Data.Configurations;

public class CareerQuizQuestionConfiguration : IEntityTypeConfiguration<CareerQuizQuestion>
{
    public void Configure(EntityTypeBuilder<CareerQuizQuestion> builder)
    {
        builder.HasKey(q => q.Id);

        builder.OwnsOne(q => q.Text, text => text.ToJson());

        builder.OwnsMany(q => q.Options, options =>
        {
            options.ToJson();
            options.OwnsOne(o => o.Text);
            options.OwnsMany(o => o.TrackWeights);
        });
    }
}
