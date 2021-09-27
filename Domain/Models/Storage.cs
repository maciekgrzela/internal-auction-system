using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class Storage
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public int LocationId { get; set; }
        public Location Location { get; set; }
        public IList<OtherDevice> OtherDevices { get; set; }
        public IList<PC> PCs { get; set; }
        public IList<Laptop> Laptops { get; set; }
        public IList<Monitor> Monitors { get; set; }
    }
}