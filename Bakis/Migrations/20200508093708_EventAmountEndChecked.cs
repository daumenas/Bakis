using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Bakis.Migrations
{
    public partial class EventAmountEndChecked : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Amount",
                table: "CityEvent",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CheckedIn",
                table: "CityEvent",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndTime",
                table: "CityEvent",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "CityEvent");

            migrationBuilder.DropColumn(
                name: "CheckedIn",
                table: "CityEvent");

            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "CityEvent");
        }
    }
}
