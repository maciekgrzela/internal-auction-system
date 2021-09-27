using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class UsersCompanyDetails
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        [RegularExpression("^[0-9]{2}-[0-9]{3}$")]
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string NIP { get; set; }
        public string PhoneNumber { get; set; }
    }
}