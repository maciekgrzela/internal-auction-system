using System.ComponentModel.DataAnnotations;

namespace Application.Resources
{
    public class SaveStorageResource
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public int LocationId { get; set; }
    }
}