using Microsoft.EntityFrameworkCore.Migrations;

namespace Bakis.Migrations
{
    public partial class RelationsUserEventSight : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConsumerEvent",
                columns: table => new
                {
                    ConsumerId = table.Column<int>(nullable: false),
                    EventId = table.Column<int>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConsumerEvent", x => new { x.ConsumerId, x.EventId });
                    table.ForeignKey(
                        name: "FK_ConsumerEvent_Consumers_ConsumerId",
                        column: x => x.ConsumerId,
                        principalTable: "Consumers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ConsumerEvent_CityEvent_EventId",
                        column: x => x.EventId,
                        principalTable: "CityEvent",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ConsumerSight",
                columns: table => new
                {
                    ConsumerId = table.Column<int>(nullable: false),
                    SightId = table.Column<int>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsGamePlayed = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConsumerSight", x => new { x.ConsumerId, x.SightId });
                    table.ForeignKey(
                        name: "FK_ConsumerSight_Consumers_ConsumerId",
                        column: x => x.ConsumerId,
                        principalTable: "Consumers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ConsumerSight_Sights_SightId",
                        column: x => x.SightId,
                        principalTable: "Sights",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConsumerEvent_EventId",
                table: "ConsumerEvent",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_ConsumerSight_SightId",
                table: "ConsumerSight",
                column: "SightId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConsumerEvent");

            migrationBuilder.DropTable(
                name: "ConsumerSight");
        }
    }
}
