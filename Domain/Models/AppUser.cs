using Microsoft.AspNetCore.Identity;

namespace Domain.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Pesel { get; set; }
        public int? UsersCompanyDetailsId { get; set; }
        public UsersCompanyDetails UsersCompanyDetails { get; set; }
    }
}