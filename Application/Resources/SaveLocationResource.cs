using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Resources
{
    public class SaveLocationResource
    {
        [Required, MaxLength(50)]
        public string Street { get; set; }
        [Required, MaxLength(6)]
        public string Number { get; set; }
        [Required]
        [RegularExpression("^[0-9]{2}-[0-9]{3}$")]
        public string PostalCode { get; set; }
        [Required, MaxLength(31)]
        public string City { get; set; }
    }
}
