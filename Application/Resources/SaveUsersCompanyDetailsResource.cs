using System.ComponentModel.DataAnnotations;

namespace Application.Resources
{
    public class SaveUsersCompanyDetailsResource
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Street { get; set; }
        [Required]
        public string Number { get; set; }
        [Required]
        public string PostalCode { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string NIP { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
    }
}