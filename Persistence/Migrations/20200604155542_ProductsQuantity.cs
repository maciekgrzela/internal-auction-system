using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class ProductsQuantity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "PurchaseItems",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "PurchaseItems",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "PCs",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "OtherDevices",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Monitors",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Laptops",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "PurchaseItems");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "PurchaseItems");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "PCs");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "OtherDevices");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Monitors");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Laptops");
        }
    }
}
