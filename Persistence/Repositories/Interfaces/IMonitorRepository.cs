using Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Persistence.Repositories.Interfaces
{
    public interface IMonitorRepository
    {
        Task<IEnumerable<Monitor>> ListAsync();
        Task<IEnumerable<Monitor>> ListWithFiltersAsync(DeviceFilter filter);
        Task AddAsync(Monitor monitor);
        Task<Monitor> FindByIdAsync(int id);
        void Update(Monitor monitor);
        void Remove(Monitor monitor);
    }
}
