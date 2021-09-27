using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Models;

namespace Persistence.Repositories.Interfaces
{
    public interface IPurchaseRepository
    {
        Task AddAsync(Purchase purchase);
        Task<List<Purchase>> ListAsync();
    }
}