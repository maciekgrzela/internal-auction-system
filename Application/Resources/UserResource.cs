using System.ComponentModel.DataAnnotations;

namespace Application.Resources
{
    public class UserResource
    {
        [Required(ErrorMessage = "The email address is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "The Password is required")]
        public string Password { get; set; }
    }
}