using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class Filter
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(20)]
        public string Name { get; set; }
        public string Value { get; set; }
    }
}