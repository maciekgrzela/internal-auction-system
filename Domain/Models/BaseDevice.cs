using System.ComponentModel.DataAnnotations;
using System;

namespace Domain.Models
{
    public class BaseDevice
    {
        public int Id { get; set; }
        [MaxLength(30)]
        public string Producer { get; set; }
        [MaxLength(20)]
        public string Type { get; set; }
        [Required, MaxLength(100)]
        public string Name { get; set; }
        [Required, MaxLength(300)]
        public string SaleReason { get; set; }
        [Required]
        public bool Tested { get; set; }
        [Required, Range(0.0, Double.PositiveInfinity)]
        public double Price { get; set; }
        [Required, Range(0, Int32.MaxValue)]
        public int Quantity { get; set; }
        [MaxLength(50)]
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
        public DateTime Created { get; set; }
        [Required]
        public int DestinationId { get; set; }
        public Destination Destination { get; set; }
        public int? InterestId { get; set; }
        public Interest Interest { get; set; }
        public int? StorageId { get; set; }
        public Storage Storage { get; set; }
    }
}