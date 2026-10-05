using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ItCareers.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateConsultationBookingFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Budget",
                table: "ConsultationBookings");

            migrationBuilder.DropColumn(
                name: "PrefersRemote",
                table: "ConsultationBookings");

            migrationBuilder.AddColumn<string>(
                name: "WebsiteIdea",
                table: "ConsultationBookings",
                type: "character varying(2000)",
                maxLength: 2000,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WebsiteIdea",
                table: "ConsultationBookings");

            migrationBuilder.AddColumn<string>(
                name: "Budget",
                table: "ConsultationBookings",
                type: "character varying(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "PrefersRemote",
                table: "ConsultationBookings",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
