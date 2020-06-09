using Microsoft.EntityFrameworkCore.Migrations;

namespace Bakis.Migrations
{
    public partial class prizeAvailable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Available",
                table: "Prizes",
                nullable: false,
                defaultValue: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Available",
                table: "Prizes");
        }
    }
}
