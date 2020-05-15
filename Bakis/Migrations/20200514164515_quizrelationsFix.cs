using Microsoft.EntityFrameworkCore.Migrations;

namespace Bakis.Migrations
{
    public partial class quizrelationsFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionChoices_Questions_QuestionId",
                table: "QuestionChoices");

            migrationBuilder.DropForeignKey(
                name: "FK_Questions_QuizTemplates_QuizTemplateId",
                table: "Questions");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionChoices_Questions_QuestionId",
                table: "QuestionChoices",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_QuizTemplates_QuizTemplateId",
                table: "Questions",
                column: "QuizTemplateId",
                principalTable: "QuizTemplates",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionChoices_Questions_QuestionId",
                table: "QuestionChoices");

            migrationBuilder.DropForeignKey(
                name: "FK_Questions_QuizTemplates_QuizTemplateId",
                table: "Questions");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionChoices_Questions_QuestionId",
                table: "QuestionChoices",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_QuizTemplates_QuizTemplateId",
                table: "Questions",
                column: "QuizTemplateId",
                principalTable: "QuizTemplates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
