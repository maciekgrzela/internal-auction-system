using Domain.Models;
using System;

namespace Application.Resources
{
    public class DeviceResource
    {
        public int Id { get; set; }
        public string Producer { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string SaleReason { get; set; }
        public bool Tested { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public string ServiceTag { get; set; }
        public string AdminsToDo { get; set; }
        public string InterfacePorts { get; set; }
        public string Comment { get; set; }
        public string Weight { get; set; }
        public string Length { get; set; }
        public string Height { get; set; }
        public string Processor { get; set; }
        public int MemoryAmount { get; set; }
        public string GraphicsCard { get; set; }
        public string DiskDrive { get; set; }
        public string ScreenResolution { get; set; }
        public string OperatingSystem { get; set; }
        public bool HasTouchScreen { get; set; }
        public double Diagonal { get; set; }
        public string Matrix { get; set; }
        public int? Refreshing { get; set; }
        public string Contrast { get; set; }
        public bool HasSpeakers { get; set; }
        public string ExtensionsCards { get; set; }
        public string Description { get; set; }
        public string Features { get; set; }
        public DateTime Created { get; set; }
        public StorageResource Storage { get; set; }
        public DestinationResource Destination { get; set; }
        public InterestResource Interest { get; set; }
    }
}