using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Destinations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(maxLength: 31, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Destinations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Filters",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 20, nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Filters", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Interests",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Interests", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Street = table.Column<string>(maxLength: 50, nullable: false),
                    Number = table.Column<string>(maxLength: 6, nullable: false),
                    PostalCode = table.Column<string>(nullable: false),
                    City = table.Column<string>(maxLength: 31, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    RoleId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Purchases",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Created = table.Column<DateTime>(nullable: false),
                    ClientId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Purchases", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Purchases_AspNetUsers_ClientId",
                        column: x => x.ClientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Storages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: false),
                    LocationId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Storages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Storages_Locations_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Locations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PurchaseItems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Producer = table.Column<string>(nullable: true),
                    Type = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    ServiceTag = table.Column<string>(nullable: true),
                    Comment = table.Column<string>(nullable: true),
                    PurchaseId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PurchaseItems_Purchases_PurchaseId",
                        column: x => x.PurchaseId,
                        principalTable: "Purchases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Laptops",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Producer = table.Column<string>(maxLength: 31, nullable: true),
                    Type = table.Column<string>(maxLength: 15, nullable: true, defaultValue: "laptop"),
                    Name = table.Column<string>(maxLength: 63, nullable: false),
                    SaleReason = table.Column<string>(maxLength: 127, nullable: false),
                    Tested = table.Column<bool>(nullable: false),
                    Price = table.Column<double>(nullable: false),
                    ServiceTag = table.Column<string>(maxLength: 63, nullable: true),
                    AdminsToDo = table.Column<string>(nullable: true),
                    InterfacePorts = table.Column<string>(nullable: true),
                    Comment = table.Column<string>(nullable: true),
                    Weight = table.Column<string>(maxLength: 7, nullable: true),
                    Length = table.Column<string>(maxLength: 7, nullable: true),
                    Height = table.Column<string>(maxLength: 7, nullable: true),
                    Created = table.Column<DateTime>(nullable: false),
                    DestinationId = table.Column<int>(nullable: false),
                    InterestId = table.Column<int>(nullable: true),
                    StorageId = table.Column<int>(nullable: true),
                    Processor = table.Column<string>(maxLength: 31, nullable: false),
                    MemoryAmount = table.Column<int>(nullable: false),
                    GraphicsCard = table.Column<string>(maxLength: 31, nullable: true),
                    DiskDrive = table.Column<string>(maxLength: 15, nullable: false),
                    ScreenResolution = table.Column<string>(maxLength: 9, nullable: true),
                    OperatingSystem = table.Column<string>(maxLength: 15, nullable: false),
                    HasTouchScreen = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Laptops", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Laptops_Destinations_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "Destinations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Laptops_Interests_InterestId",
                        column: x => x.InterestId,
                        principalTable: "Interests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Laptops_Storages_StorageId",
                        column: x => x.StorageId,
                        principalTable: "Storages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Monitors",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Producer = table.Column<string>(maxLength: 31, nullable: true),
                    Type = table.Column<string>(maxLength: 15, nullable: true, defaultValue: "monitor"),
                    Name = table.Column<string>(maxLength: 63, nullable: false),
                    SaleReason = table.Column<string>(maxLength: 127, nullable: false),
                    Tested = table.Column<bool>(nullable: false),
                    Price = table.Column<double>(nullable: false),
                    ServiceTag = table.Column<string>(maxLength: 63, nullable: true),
                    AdminsToDo = table.Column<string>(nullable: true),
                    InterfacePorts = table.Column<string>(nullable: true),
                    Comment = table.Column<string>(nullable: true),
                    Weight = table.Column<string>(maxLength: 7, nullable: true),
                    Length = table.Column<string>(maxLength: 7, nullable: true),
                    Height = table.Column<string>(maxLength: 7, nullable: true),
                    Created = table.Column<DateTime>(nullable: false),
                    DestinationId = table.Column<int>(nullable: false),
                    InterestId = table.Column<int>(nullable: true),
                    StorageId = table.Column<int>(nullable: true),
                    ScreenResolution = table.Column<string>(maxLength: 9, nullable: false),
                    Diagonal = table.Column<double>(nullable: false),
                    Matrix = table.Column<string>(nullable: true),
                    Refreshing = table.Column<int>(nullable: true),
                    Contrast = table.Column<string>(nullable: true),
                    HasSpeakers = table.Column<bool>(nullable: false),
                    HasTouchScreen = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Monitors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Monitors_Destinations_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "Destinations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Monitors_Interests_InterestId",
                        column: x => x.InterestId,
                        principalTable: "Interests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Monitors_Storages_StorageId",
                        column: x => x.StorageId,
                        principalTable: "Storages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OtherDevices",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Producer = table.Column<string>(maxLength: 31, nullable: true),
                    Type = table.Column<string>(maxLength: 15, nullable: true, defaultValue: "otherdevice"),
                    Name = table.Column<string>(maxLength: 63, nullable: false),
                    SaleReason = table.Column<string>(maxLength: 127, nullable: false),
                    Tested = table.Column<bool>(nullable: false),
                    Price = table.Column<double>(nullable: false),
                    ServiceTag = table.Column<string>(maxLength: 63, nullable: true),
                    AdminsToDo = table.Column<string>(nullable: true),
                    InterfacePorts = table.Column<string>(nullable: true),
                    Comment = table.Column<string>(nullable: true),
                    Weight = table.Column<string>(maxLength: 7, nullable: true),
                    Length = table.Column<string>(maxLength: 7, nullable: true),
                    Height = table.Column<string>(maxLength: 7, nullable: true),
                    Created = table.Column<DateTime>(nullable: false),
                    DestinationId = table.Column<int>(nullable: false),
                    InterestId = table.Column<int>(nullable: true),
                    StorageId = table.Column<int>(nullable: true),
                    Description = table.Column<string>(maxLength: 63, nullable: false),
                    Features = table.Column<string>(maxLength: 127, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtherDevices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OtherDevices_Destinations_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "Destinations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OtherDevices_Interests_InterestId",
                        column: x => x.InterestId,
                        principalTable: "Interests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OtherDevices_Storages_StorageId",
                        column: x => x.StorageId,
                        principalTable: "Storages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PCs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Producer = table.Column<string>(maxLength: 31, nullable: true),
                    Type = table.Column<string>(maxLength: 15, nullable: true, defaultValue: "pc"),
                    Name = table.Column<string>(maxLength: 63, nullable: false),
                    SaleReason = table.Column<string>(maxLength: 127, nullable: false),
                    Tested = table.Column<bool>(nullable: false),
                    Price = table.Column<double>(nullable: false),
                    ServiceTag = table.Column<string>(maxLength: 63, nullable: true),
                    AdminsToDo = table.Column<string>(nullable: true),
                    InterfacePorts = table.Column<string>(nullable: true),
                    Comment = table.Column<string>(nullable: true),
                    Weight = table.Column<string>(maxLength: 7, nullable: true),
                    Length = table.Column<string>(maxLength: 7, nullable: true),
                    Height = table.Column<string>(maxLength: 7, nullable: true),
                    Created = table.Column<DateTime>(nullable: false),
                    DestinationId = table.Column<int>(nullable: false),
                    InterestId = table.Column<int>(nullable: true),
                    StorageId = table.Column<int>(nullable: true),
                    Processor = table.Column<string>(maxLength: 31, nullable: false),
                    MemoryAmount = table.Column<int>(nullable: false),
                    GraphicsCard = table.Column<string>(maxLength: 31, nullable: true),
                    ExtensionsCards = table.Column<string>(nullable: true),
                    DiskDrive = table.Column<string>(maxLength: 15, nullable: false),
                    OperatingSystem = table.Column<string>(maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PCs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PCs_Destinations_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "Destinations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PCs_Interests_InterestId",
                        column: x => x.InterestId,
                        principalTable: "Interests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PCs_Storages_StorageId",
                        column: x => x.StorageId,
                        principalTable: "Storages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Laptops_DestinationId",
                table: "Laptops",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_Laptops_InterestId",
                table: "Laptops",
                column: "InterestId");

            migrationBuilder.CreateIndex(
                name: "IX_Laptops_StorageId",
                table: "Laptops",
                column: "StorageId");

            migrationBuilder.CreateIndex(
                name: "IX_Monitors_DestinationId",
                table: "Monitors",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_Monitors_InterestId",
                table: "Monitors",
                column: "InterestId");

            migrationBuilder.CreateIndex(
                name: "IX_Monitors_StorageId",
                table: "Monitors",
                column: "StorageId");

            migrationBuilder.CreateIndex(
                name: "IX_OtherDevices_DestinationId",
                table: "OtherDevices",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_OtherDevices_InterestId",
                table: "OtherDevices",
                column: "InterestId");

            migrationBuilder.CreateIndex(
                name: "IX_OtherDevices_StorageId",
                table: "OtherDevices",
                column: "StorageId");

            migrationBuilder.CreateIndex(
                name: "IX_PCs_DestinationId",
                table: "PCs",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_PCs_InterestId",
                table: "PCs",
                column: "InterestId");

            migrationBuilder.CreateIndex(
                name: "IX_PCs_StorageId",
                table: "PCs",
                column: "StorageId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseItems_PurchaseId",
                table: "PurchaseItems",
                column: "PurchaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Purchases_ClientId",
                table: "Purchases",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_Storages_LocationId",
                table: "Storages",
                column: "LocationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Filters");

            migrationBuilder.DropTable(
                name: "Laptops");

            migrationBuilder.DropTable(
                name: "Monitors");

            migrationBuilder.DropTable(
                name: "OtherDevices");

            migrationBuilder.DropTable(
                name: "PCs");

            migrationBuilder.DropTable(
                name: "PurchaseItems");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Destinations");

            migrationBuilder.DropTable(
                name: "Interests");

            migrationBuilder.DropTable(
                name: "Storages");

            migrationBuilder.DropTable(
                name: "Purchases");

            migrationBuilder.DropTable(
                name: "Locations");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
