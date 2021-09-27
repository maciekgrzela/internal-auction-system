using Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Persistence.Repositories.Interfaces
{
    public interface ILocationRepository
    {
        Task<IEnumerable<Location>> ListAsync();
        Task AddAsync(Location location);
        Task<Location> FindByIdAsync(int id);
        void Update(Location location);
        void Remove(Location location);
    }
}
