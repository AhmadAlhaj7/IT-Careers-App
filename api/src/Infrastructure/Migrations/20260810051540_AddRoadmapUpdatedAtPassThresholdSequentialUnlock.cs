using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ItCareers.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddRoadmapUpdatedAtPassThresholdSequentialUnlock : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PassThresholdPercent",
                table: "Roadmaps",
                type: "integer",
                nullable: false,
                defaultValue: 70);

            migrationBuilder.AddColumn<bool>(
                name: "SequentialUnlockEnabled",
                table: "Roadmaps",
                type: "boolean",
                nullable: false,
                defaultValue: true);

            // Existing rows predate this column — backfilling with "now" (migration-apply
            // time) rather than a default(DateTimeOffset) epoch, so the admin list's "last
            // updated" column shows something sane for roadmaps that already existed.
            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "UpdatedAt",
                table: "Roadmaps",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: DateTimeOffset.UtcNow);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PassThresholdPercent",
                table: "Roadmaps");

            migrationBuilder.DropColumn(
                name: "SequentialUnlockEnabled",
                table: "Roadmaps");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Roadmaps");
        }
    }
}
