using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ItCareers.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddRoadmapLevelPricingOutcomesAndPhaseTagSkills : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Level",
                table: "Roadmaps",
                type: "jsonb",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "OriginalPrice",
                table: "Roadmaps",
                type: "numeric(10,2)",
                precision: 10,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Outcomes",
                table: "Roadmaps",
                type: "jsonb",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Skills",
                table: "Phases",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tag",
                table: "Phases",
                type: "jsonb",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Level",
                table: "Roadmaps");

            migrationBuilder.DropColumn(
                name: "OriginalPrice",
                table: "Roadmaps");

            migrationBuilder.DropColumn(
                name: "Outcomes",
                table: "Roadmaps");

            migrationBuilder.DropColumn(
                name: "Skills",
                table: "Phases");

            migrationBuilder.DropColumn(
                name: "Tag",
                table: "Phases");
        }
    }
}
