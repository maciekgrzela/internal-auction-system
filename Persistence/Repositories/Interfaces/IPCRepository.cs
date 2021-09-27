using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Models;

namespace Persistence.Repositories.Interfaces
{
    public interface IPCRepository
    {
        Task<IEnumerable<PC>> ListAsync();
        Task<IEnumerable<PC>> ListWithFiltersAsync(DeviceFilter filter);
        Task AddAsync(PC pc);
        Task<PC> FindByIdAsync(int id);
        void Update(PC pc);
        void Remove(PC pc);
    }
}