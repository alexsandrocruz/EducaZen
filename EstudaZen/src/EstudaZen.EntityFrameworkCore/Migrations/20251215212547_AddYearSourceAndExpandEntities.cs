using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EstudaZen.Migrations
{
    /// <inheritdoc />
    public partial class AddYearSourceAndExpandEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "BirthDate",
                table: "AppStudents",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CPF",
                table: "AppStudents",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ClassId",
                table: "AppStudents",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "AppStudents",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EnrollmentDate",
                table: "AppStudents",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EnrollmentNumber",
                table: "AppStudents",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "AppStudents",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "AppStudents",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "AppStudents",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhotoUrl",
                table: "AppStudents",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "AppStudents",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "CNPJ",
                table: "AppSchools",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "AppSchools",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "AppSchools",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "AppSchools",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "AppSchools",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ZipCode",
                table: "AppSchools",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Source",
                table: "AppQuestions",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "AppQuestions",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BirthDate",
                table: "AppStudents");

            migrationBuilder.DropColumn(
                name: "CPF",
                table: "AppStudents");

            migrationBuilder.DropColumn(
                name: "ClassId",
                table: "AppStudents");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "AppStudents");

            migrationBuilder.DropColumn(
                name: "EnrollmentDate",
                table: "AppStudents");

            migrationBuilder.DropColumn(
                name: "EnrollmentNumber",
                table: "AppStudents");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "AppStudents");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "AppStudents");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "AppStudents");

            migrationBuilder.DropColumn(
                name: "PhotoUrl",
                table: "AppStudents");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "AppStudents");

            migrationBuilder.DropColumn(
                name: "CNPJ",
                table: "AppSchools");

            migrationBuilder.DropColumn(
                name: "City",
                table: "AppSchools");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "AppSchools");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "AppSchools");

            migrationBuilder.DropColumn(
                name: "State",
                table: "AppSchools");

            migrationBuilder.DropColumn(
                name: "ZipCode",
                table: "AppSchools");

            migrationBuilder.DropColumn(
                name: "Source",
                table: "AppQuestions");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "AppQuestions");
        }
    }
}
