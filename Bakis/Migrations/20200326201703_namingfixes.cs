using Microsoft.EntityFrameworkCore.Migrations;

namespace Bakis.Migrations
{
    public partial class namingfixes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Langtitude",
                table: "CityEvent");

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "CityEvent",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "CityEvent");

            migrationBuilder.AddColumn<double>(
                name: "Langtitude",
                table: "CityEvent",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
