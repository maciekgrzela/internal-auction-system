using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class OtherDevice : BaseDevice
    {
        [Required, MaxLength(500)]
        public string Description { get; set; }
        [Required, MaxLength(500)]
        public string Features { get; set; }
    }
}