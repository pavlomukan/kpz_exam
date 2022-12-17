using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class CreateSchoolMenu : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SchoolMenu",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    date = table.Column<DateTime>(type: "Date", nullable: false),
                    SchoolId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolMenu", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchoolMenu_School_SchoolId",
                        column: x => x.SchoolId,
                        principalTable: "School",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SchoolMenuProducts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AmountKG = table.Column<double>(type: "float", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    SchoolMenuId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolMenuProducts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchoolMenuProducts_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SchoolMenuProducts_SchoolMenu_SchoolMenuId",
                        column: x => x.SchoolMenuId,
                        principalTable: "SchoolMenu",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SchoolMenu_SchoolId",
                table: "SchoolMenu",
                column: "SchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolMenuProducts_ProductId",
                table: "SchoolMenuProducts",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolMenuProducts_SchoolMenuId",
                table: "SchoolMenuProducts",
                column: "SchoolMenuId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SchoolMenuProducts");

            migrationBuilder.DropTable(
                name: "SchoolMenu");
        }
    }
}
