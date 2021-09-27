using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UsersCompanyDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Pesel",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UsersCompanyDetailsId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UsersCompanyDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Street = table.Column<string>(nullable: true),
                    Number = table.Column<string>(nullable: true),
                    PostalCode = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    NIP = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersCompanyDetails", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_UsersCompanyDetailsId",
                table: "AspNetUsers",
                column: "UsersCompanyDetailsId");

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

            migrationBuilder.DropTable(
                name: "UsersCompanyDetails");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_UsersCompanyDetailsId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Pesel",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "UsersCompanyDetailsId",
                table: "AspNetUsers");
        }
    }
}
