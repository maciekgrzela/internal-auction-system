using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class Interest
    {
        public int Id { get; set; }
        [Required, MaxLength(15)]
        public string Description { get; set; }
    }
}