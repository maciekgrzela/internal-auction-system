using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Responses;
using Domain.Models;

namespace Application.Services.Interfaces
{
    public interface IPCService
    {
        Task<IEnumerable<PC>> ListAsync();
        Task<IEnumerable<PC>> ListWithFiltersAsync(DeviceFilter filter);
        Task<PC> SaveAsync(PC pc);
        Task<PC> FindByIdAsync(int id);
        Task<Response<PC>> UpdateAsync(int id, PC pc);
        Task<Response<PC>> DeleteAsync(int id);
    }
}