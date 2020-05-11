using Microsoft.EntityFrameworkCore.Migrations;

namespace Bakis.Migrations
{
    public partial class quizConsumer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConsumerQuiz",
                columns: table => new
                {
                    ConsumerId = table.Column<int>(nullable: false),
                    QuizTemplateId = table.Column<int>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConsumerQuiz", x => new { x.ConsumerId, x.QuizTemplateId });
                    table.ForeignKey(
                        name: "FK_ConsumerQuiz_Consumers_ConsumerId",
                        column: x => x.ConsumerId,
                        principalTable: "Consumers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ConsumerQuiz_QuizTemplates_QuizTemplateId",
                        column: x => x.QuizTemplateId,
                        principalTable: "QuizTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConsumerQuiz_QuizTemplateId",
                table: "ConsumerQuiz",
                column: "QuizTemplateId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConsumerQuiz");
        }
    }
}
