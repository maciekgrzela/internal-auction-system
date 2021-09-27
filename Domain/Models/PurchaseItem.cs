using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    public class PurchaseItem
    {
        public int Id { get; set; }
        [NotMapped]
        public int DeviceKey { get; set; }
        public string Producer { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string ServiceTag { get; set; }
        public string Comment { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
    }
}