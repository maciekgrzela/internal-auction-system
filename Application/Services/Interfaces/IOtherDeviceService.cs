using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Responses;
using Domain.Models;

namespace Application.Services.Interfaces
{
    public interface IOtherDeviceService
    {
        Task<IEnumerable<OtherDevice>> ListAsync();
        Task<IEnumerable<OtherDevice>> ListWithFiltersAsync(DeviceFilter filter);
        Task<OtherDevice> SaveAsync(OtherDevice otherDevice);
        Task<OtherDevice> FindByIdAsync(int id);
        Task<Response<OtherDevice>> UpdateAsync(int id, OtherDevice otherDevice);
        Task<Response<OtherDevice>> DeleteAsync(int id);
    }
}