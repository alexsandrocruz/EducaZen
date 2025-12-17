using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EstudaZen.Migrations
{
    /// <inheritdoc />
    public partial class AddQuestionUsageTracking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LastUsedAt",
                table: "AppQuestions",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UsageCount",
                table: "AppQuestions",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastUsedAt",
                table: "AppQuestions");

            migrationBuilder.DropColumn(
                name: "UsageCount",
                table: "AppQuestions");
        }
    }
}
