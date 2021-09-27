using Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Persistence.Repositories.Interfaces
{
    public interface ILaptopRepository
    {
        Task<IEnumerable<Laptop>> ListAsync();
        Task<IEnumerable<Laptop>> ListWithFiltersAsync(DeviceFilter filter);
        Task AddAsync(Laptop laptop);
        Task<Laptop> FindByIdAsync(int id);
        void Update(Laptop laptop);
        void Remove(Laptop laptop);
    }
}
