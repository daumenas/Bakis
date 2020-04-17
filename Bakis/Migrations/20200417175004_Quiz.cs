using Microsoft.EntityFrameworkCore.Migrations;

namespace Bakis.Migrations
{
    public partial class Quiz : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "QuizTemplates",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizTemplates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: false),
                    CorrectAnswer = table.Column<int>(nullable: false),
                    QuizTemplateId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Questions_QuizTemplates_QuizTemplateId",
                        column: x => x.QuizTemplateId,
                        principalTable: "QuizTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "QuestionChoices",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: true),
                    QuestionId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionChoices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuestionChoices_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_QuestionChoices_QuestionId",
                table: "QuestionChoices",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_QuizTemplateId",
                table: "Questions",
                column: "QuizTemplateId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuestionChoices");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "QuizTemplates");
        }
    }
}
