using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class PC : BaseDevice
    {
        [Required, MaxLength(200)]
        public string Processor { get; set; }
        [Required, Range(0, 128)]
        public int MemoryAmount { get; set; }
        [MaxLength(200)]
        public string GraphicsCard { get; set; }
        public string ExtensionsCards { get; set; }
        [Required, MaxLength(200)]
        public string DiskDrive { get; set; }
        [MaxLength(100)]
        public string OperatingSystem { get; set; }
    }
}