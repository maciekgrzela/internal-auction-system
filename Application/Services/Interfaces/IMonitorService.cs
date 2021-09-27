using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Responses;
using Domain.Models;

namespace Application.Services.Interfaces
{
    public interface IMonitorService
    {
        Task<IEnumerable<Monitor>> ListAsync();
        Task<IEnumerable<Monitor>> ListWithFiltersAsync(DeviceFilter filter);
        Task<Monitor> SaveAsync(Monitor Monitor);
        Task<Monitor> FindByIdAsync(int id);
        Task<Response<Monitor>> UpdateAsync(int id, Monitor Monitor);
        Task<Response<Monitor>> DeleteAsync(int id);
    }
}