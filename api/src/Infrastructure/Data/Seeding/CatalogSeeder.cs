using ItCareers.Domain.Common;
using ItCareers.Domain.Entities;
using ItCareers.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Seeding;

// One real roadmap so Slice 2's free-preview pages have something to show. Deliberately
// temporary — Slice 3 replaces this with content the admin actually authors through the app.
public static class CatalogSeeder
{
    public static async Task SeedAsync(ItCareersDbContext context)
    {
        // Check Tracks, not Roadmaps: there's no admin UI to delete a Track (deliberately —
        // it's seed-only), so its presence is a reliable "has this database ever been seeded"
        // signal even after an admin deletes every Roadmap through the CRUD screens. Checking
        // Roadmaps instead would make the seeder try to re-insert the same Track on every
        // restart once it's empty, crashing on the unique slug constraint.
        if (await context.Tracks.AnyAsync())
        {
            return;
        }

        var track = new Track(
            Guid.NewGuid(),
            "software-engineering",
            new LocalizedText(Ar: "هندسة البرمجيات", En: "Software Engineering"),
            new LocalizedText(
                Ar: "صمم وابنِ وأطلق برمجيات حقيقية — من أول برنامج تكتبه إلى أنظمة تعمل في الإنتاج.",
                En: "Design, build, and ship real software — from your first program to production systems."),
            published: true);

        // Price is a placeholder — the final price point is still an open business decision.
        var roadmap = new Roadmap(
            Guid.NewGuid(),
            track.Id,
            new LocalizedText(Ar: "هندسة البرمجيات", En: "Software Engineering"),
            "software-engineering",
            price: 0m,
            RoadmapStatus.Published);

        var phase = new Phase(
            Guid.NewGuid(),
            roadmap.Id,
            new LocalizedText(Ar: "أساسيات البرمجة الكائنية", En: "OOP Fundamentals"),
            orderIndex: 1,
            new LocalizedText(
                Ar: "قبل أن تلمس أي إطار عمل، عليك أن تتعلم التفكير بالكائنات. خذ وقتك هنا، هذه المرحلة تستحق التأني.",
                En: "Before you touch a framework, you need to think in objects. Take your time here — this phase is worth sitting with."),
            pdfUrl: null,
            PhaseType.Standard);

        var resources = new[]
        {
            new Resource(
                Guid.NewGuid(),
                phase.Id,
                new LocalizedText(Ar: "شرح الأصناف والكائنات", En: "Classes and objects explained"),
                "https://en.wikipedia.org/wiki/Object-oriented_programming",
                ResourceType.Video,
                ResourceAccessType.Free),
            new Resource(
                Guid.NewGuid(),
                phase.Id,
                new LocalizedText(Ar: "الوراثة وتعدد الأشكال، التوثيق", En: "Inheritance and polymorphism, docs"),
                "https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)",
                ResourceType.Documentation,
                ResourceAccessType.Free),
        };

        var project = new Project(
            Guid.NewGuid(),
            phase.Id,
            new LocalizedText(Ar: "صمم نظامًا بسيطًا لإدارة مكتبة", En: "Model a small library system"),
            new LocalizedText(
                Ar: "ابنِ عدة أصناف تمثل الكتب والأعضاء وعمليات الاستعارة، مستخدمًا الوراثة والتغليف للحفاظ على تصميم نظيف.",
                En: "Build a few classes representing books, members, and loans, using inheritance and encapsulation to keep the design clean."),
            isCapstone: false);

        context.Tracks.Add(track);
        context.Roadmaps.Add(roadmap);
        context.Phases.Add(phase);
        context.Resources.AddRange(resources);
        context.Projects.Add(project);

        await context.SaveChangesAsync();
    }
}
