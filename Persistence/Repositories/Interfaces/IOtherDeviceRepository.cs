using Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Persistence.Repositories.Interfaces
{
    public interface IOtherDeviceRepository
    {
        Task<IEnumerable<OtherDevice>> ListAsync();
        Task<IEnumerable<OtherDevice>> ListWithFiltersAsync(DeviceFilter filter);
        Task AddAsync(OtherDevice otherDevice);
        Task<OtherDevice> FindByIdAsync(int id);
        void Update(OtherDevice otherDevice);
        void Remove(OtherDevice otherDevice);
    }
}
