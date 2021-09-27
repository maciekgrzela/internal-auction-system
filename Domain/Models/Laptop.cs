using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class Laptop : BaseDevice
    {
        [Required, MaxLength(200)]
        public string Processor { get; set; }
        [Required, Range(0, 1024)]
        public int MemoryAmount { get; set; }
        [MaxLength(100)]
        public string GraphicsCard { get; set; }
        [Required, MaxLength(100)]
        public string DiskDrive { get; set; }
        [MinLength(7), MaxLength(10)]
        public string ScreenResolution { get; set; }
        [MaxLength(100)]
        public string OperatingSystem { get; set; }
        public bool HasTouchScreen { get; set; }
    }
}