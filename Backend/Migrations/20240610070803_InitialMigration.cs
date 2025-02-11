using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LMS.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AnyOtherForiegnLanguages",
                columns: table => new
                {
                    LanguageId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Language = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LanguageRating = table.Column<int>(type: "int", nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnyOtherForiegnLanguages", x => x.LanguageId);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Designation = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ReportingManagerId = table.Column<int>(type: "int", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    DOB = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ContactNumber = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    EmailId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfJoining = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TotalExperience = table.Column<float>(type: "real", nullable: false),
                    BachelorDegree = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    BachelorSpecialization = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    MasterDegree = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    MasterSpecialization = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Certification = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Photo = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.EmployeeId);
                });

            migrationBuilder.CreateTable(
                name: "OtherSkills",
                columns: table => new
                {
                    SkillId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SkillName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SkillRating = table.Column<int>(type: "int", nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtherSkills", x => x.SkillId);
                });

            migrationBuilder.CreateTable(
                name: "SkillAssessment",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    Database = table.Column<int>(type: "int", nullable: false),
                    Programming = table.Column<int>(type: "int", nullable: false),
                    Java = table.Column<int>(type: "int", nullable: false),
                    CSharp = table.Column<int>(type: "int", nullable: false),
                    Python = table.Column<int>(type: "int", nullable: false),
                    WebDevelopment = table.Column<int>(type: "int", nullable: false),
                    VerbalCommunication = table.Column<int>(type: "int", nullable: false),
                    WrittenCommunication = table.Column<int>(type: "int", nullable: false),
                    Teamwork = table.Column<int>(type: "int", nullable: false),
                    ProblemSolving = table.Column<int>(type: "int", nullable: false),
                    DescisionMaking = table.Column<int>(type: "int", nullable: false),
                    Leadership = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SkillAssessment", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AnyOtherForiegnLanguages");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "OtherSkills");

            migrationBuilder.DropTable(
                name: "SkillAssessment");
        }
    }
}
