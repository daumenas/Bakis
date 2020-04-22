using Microsoft.EntityFrameworkCore.Migrations;

namespace Bakis.Migrations
{
    public partial class ConsumerWithPoints : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Points",
                table: "Consumers",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Points",
                table: "Consumers");
        }
    }
}
