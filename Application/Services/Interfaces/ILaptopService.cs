using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Responses;
using Domain.Models;

namespace Application.Services.Interfaces
{
    public interface ILaptopService
    {
        Task<IEnumerable<Laptop>> ListAsync();
        Task<IEnumerable<Laptop>> ListWithFiltersAsync(DeviceFilter filter);
        Task<Laptop> SaveAsync(Laptop laptop);
        Task<Laptop> FindByIdAsync(int id);
        Task<Response<Laptop>> UpdateAsync(int id, Laptop laptop);
        Task<Response<Laptop>> DeleteAsync(int id);
    }
}