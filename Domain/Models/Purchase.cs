using System;
using System.Collections.Generic;

namespace Domain.Models
{
    public class Purchase
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public string ClientId { get; set; }
        public AppUser Client { get; set; }
        public List<PurchaseItem> Items { get; set; }
    }
}