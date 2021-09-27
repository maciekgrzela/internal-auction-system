using System;
using System.ComponentModel.DataAnnotations;

namespace Application.Resources
{
    public class SavePCResource
    {
        [MaxLength(31)]
        public string Producer { get; set; }
        public string Type { get; set; }
        [Required, MaxLength(63)]
        public string Name { get; set; }
        [Required, MaxLength(127)]
        public string SaleReason { get; set; }
        [Required]
        public bool Tested { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public int Quantity { get; set; }
        [MaxLength(63)]
        public string ServiceTag { get; set; }
        public string AdminsToDo { get; set; }
        public string InterfacePorts { get; set; }
        public string Comment { get; set; }
        [MaxLength(7)]
        public string Weight { get; set; }
        [MaxLength(7)]
        public string Length { get; set; }
        [MaxLength(7)]
        public string Height { get; set; }

        [Required, MaxLength(100)]
        public string Processor { get; set; }
        [Required, Range(0, 1024)]
        public int MemoryAmount { get; set; }
        [MaxLength(31)]
        public string GraphicsCard { get; set; }
        [Required, MaxLength(100)]
        public string DiskDrive { get; set; }
        [MaxLength(100)]
        public string OperatingSystem { get; set; }
        public string ExtensionsCards { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        [Required]
        public int DestinationId { get; set; }
        public int? InterestId { get; set; }
        public int? StorageId { get; set; }
    }
}