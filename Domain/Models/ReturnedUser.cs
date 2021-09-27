using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    public class ReturnedUser
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }
        public int? UsersCompanyDetailsId { get; set; }
        public UsersCompanyDetails UsersCompanyDetails { get; set; }
    }
}