using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UsersCompanyDetailsImproved2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_CompanyDetails_UsersCompanyDetailsId",
                table: "AspNetUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CompanyDetails",
                table: "CompanyDetails");

            migrationBuilder.RenameTable(
                name: "CompanyDetails",
                newName: "UsersCompanyDetails");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersCompanyDetails",
                table: "UsersCompanyDetails",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_UsersCompanyDetails_UsersCompanyDetailsId",
                table: "AspNetUsers",
                column: "UsersCompanyDetailsId",
                principalTable: "UsersCompanyDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_UsersCompanyDetails_UsersCompanyDetailsId",
                table: "AspNetUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersCompanyDetails",
                table: "UsersCompanyDetails");

            migrationBuilder.RenameTable(
                name: "UsersCompanyDetails",
                newName: "CompanyDetails");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CompanyDetails",
                table: "CompanyDetails",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_CompanyDetails_UsersCompanyDetailsId",
                table: "AspNetUsers",
                column: "UsersCompanyDetailsId",
                principalTable: "CompanyDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
