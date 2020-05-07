using Microsoft.EntityFrameworkCore.Migrations;

namespace Bakis.Migrations
{
    public partial class QuizSightrelations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "QuizTemplateId",
                table: "Sights",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SightId",
                table: "QuizTemplates",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_QuizTemplates_SightId",
                table: "QuizTemplates",
                column: "SightId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_QuizTemplates_Sights_SightId",
                table: "QuizTemplates",
                column: "SightId",
                principalTable: "Sights",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuizTemplates_Sights_SightId",
                table: "QuizTemplates");

            migrationBuilder.DropIndex(
                name: "IX_QuizTemplates_SightId",
                table: "QuizTemplates");

            migrationBuilder.DropColumn(
                name: "QuizTemplateId",
                table: "Sights");

            migrationBuilder.DropColumn(
                name: "SightId",
                table: "QuizTemplates");
        }
    }
}
