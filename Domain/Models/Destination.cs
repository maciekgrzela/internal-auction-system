using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class Destination
    {
        public int Id { get; set; }
        [Required, MaxLength(31)]
        public string Description { get; set; }
    }
}