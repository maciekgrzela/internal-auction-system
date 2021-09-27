using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Application.Resources
{
    public class SaveUserResource
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; }
        [Required]
        [MinLength(7, ErrorMessage = "Password must be at least 7 characters")]
        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^0-9a-zA-Z]).{7,}$",
        ErrorMessage = "Password must contain at least 1 uppercase character, 1 lowercase character, 1 non alphanumeric character and 1 digit")]
        public string Password { get; set; }
    }
}
