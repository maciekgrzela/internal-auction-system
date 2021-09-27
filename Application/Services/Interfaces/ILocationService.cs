using Application.Responses;
using Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Services.Interfaces
{
    public interface ILocationService
    {
        Task<IEnumerable<Location>> ListAsync();
        Task<Response<Location>> GetLocationAsync(int id);
        Task<Location> SaveAsync(Location location);
        Task<Response<Location>> UpdateAsync(int id, Location location);
        Task<Response<Location>> DeleteAsync(int id);
    }
}
