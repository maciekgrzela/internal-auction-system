namespace Application.Resources
{
    public class ReturnedUserResource
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }
        public UsersCompanyDetailsResource UsersCompanyDetails { get; set; }
    }
}