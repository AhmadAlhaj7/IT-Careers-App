using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ItCareers.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddLeadStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Leads that already exist predate the inbox, so they start at the beginning of the pipeline.
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "WebsiteOrders",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "New");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "ConsultationBookings",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "New");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "WebsiteOrders");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "ConsultationBookings");
        }
    }
}
