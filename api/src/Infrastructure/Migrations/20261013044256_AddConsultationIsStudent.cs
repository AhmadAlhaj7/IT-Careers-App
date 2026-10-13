using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ItCareers.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddConsultationIsStudent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsStudent",
                table: "ConsultationBookings",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsStudent",
                table: "ConsultationBookings");
        }
    }
}
