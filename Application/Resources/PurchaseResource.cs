using System;
using System.Collections.Generic;

namespace Application.Resources
{
    public class PurchaseResource
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public UserResource Client { get; set; }
        public List<PurchaseItemResource> Items { get; set; }
    }
}