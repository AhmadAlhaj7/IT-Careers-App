using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ItCareers.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddSpecializations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Specializations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Slug = table.Column<string>(type: "text", nullable: false),
                    Category = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    DemandLevel = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    CoverImageUrl = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    IntroVideoUrl = table.Column<string>(type: "text", nullable: true),
                    IntroVideoDurationLabel = table.Column<string>(type: "text", nullable: true),
                    PdfUrl = table.Column<string>(type: "text", nullable: true),
                    PdfFileName = table.Column<string>(type: "text", nullable: true),
                    LinkedRoadmapId = table.Column<Guid>(type: "uuid", nullable: true),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CardSentence = table.Column<string>(type: "jsonb", nullable: false),
                    DemandQuickFact = table.Column<string>(type: "jsonb", nullable: true),
                    DifficultyQuickFact = table.Column<string>(type: "jsonb", nullable: true),
                    Faqs = table.Column<string>(type: "jsonb", nullable: true),
                    IntroVideoCaption = table.Column<string>(type: "jsonb", nullable: true),
                    Name = table.Column<string>(type: "jsonb", nullable: false),
                    RoadmapButtonText = table.Column<string>(type: "jsonb", nullable: true),
                    SalaryQuickFact = table.Column<string>(type: "jsonb", nullable: true),
                    Sections = table.Column<string>(type: "jsonb", nullable: true),
                    Summary = table.Column<string>(type: "jsonb", nullable: false),
                    TimeToJobQuickFact = table.Column<string>(type: "jsonb", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Specializations", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Specializations_Slug",
                table: "Specializations",
                column: "Slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Specializations");
        }
    }
}
