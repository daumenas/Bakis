using Microsoft.EntityFrameworkCore.Migrations;

namespace Bakis.Migrations
{
    public partial class changePointsToInt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Points",
                table: "Sights",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<int>(
                name: "Points",
                table: "CityEvent",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Points",
                table: "Sights",
                type: "float",
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<double>(
                name: "Points",
                table: "CityEvent",
                type: "float",
                nullable: false,
                oldClrType: typeof(int));
        }
    }
}
