using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class Location
    {
        public int Id { get; set; }
        [Required, MaxLength(50)]
        public string Street { get; set; }
        [Required, MaxLength(6)]
        public string Number { get; set; }
        [Required]
        [RegularExpression("^[0-9]{2}-[0-9]{3}$")]
        public string PostalCode { get; set; }
        [Required, MaxLength(31)]
        public string City { get; set; }
        public IList<Storage> Storages { get; set; }
    }
}
