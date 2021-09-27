using Domain.Models;

namespace Application.Resources
{
    public class OtherDeviceResource
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
        public string Description { get; set; }
        public string Features { get; set; }
        public StorageResource Storage { get; set; }
        public Destination Destination { get; set; }
        public Interest Interest { get; set; }
    }
}