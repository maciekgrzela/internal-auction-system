using System;
using System.ComponentModel.DataAnnotations;

namespace Application.Resources
{
    public class SaveMonitorResource
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

        [Required, MinLength(7), MaxLength(9)]
        public string ScreenResolution { get; set; }
        [Required, Range(12, 100)]
        public double Diagonal { get; set; }
        public string Matrix { get; set; }
        [Range(30, 240)]
        public int? Refreshing { get; set; }
        public string Contrast { get; set; }
        public bool HasSpeakers { get; set; }
        public bool HasTouchScreen { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        [Required]
        public int DestinationId { get; set; }
        public int? InterestId { get; set; }
        public int? StorageId { get; set; }
    }
}