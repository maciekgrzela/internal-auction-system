using Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Contexts
{
    public class DataContext : IdentityDbContext<AppUser, IdentityRole, string>
    {
        public DbSet<Laptop> Laptops { get; set; }
        public DbSet<Monitor> Monitors { get; set; }
        public DbSet<Storage> Storages { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<PC> PCs { get; set; }
        public DbSet<OtherDevice> OtherDevices { get; set; }
        public DbSet<Destination> Destinations { get; set; }
        public DbSet<Interest> Interests { get; set; }
        public DbSet<Filter> Filters { get; set; }
        public DbSet<Purchase> Purchases { get; set; }
        public DbSet<PurchaseItem> PurchaseItems { get; set; }
        public DbSet<UsersCompanyDetails> UsersCompanyDetails { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Laptop>().Property(p => p.Type).HasDefaultValue("laptop");
            builder.Entity<PC>().Property(p => p.Type).HasDefaultValue("pc");
            builder.Entity<OtherDevice>().Property(p => p.Type).HasDefaultValue("otherdevice");
            builder.Entity<Monitor>().Property(p => p.Type).HasDefaultValue("monitor");
            builder.Ignore<User>();
            builder.Ignore<ReturnedUser>();
            builder.Ignore<DeviceFilter>();
        }
    }
}