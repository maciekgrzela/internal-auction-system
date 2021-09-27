using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Responses;
using Domain.Models;

namespace Application.Services.Interfaces
{
    public interface IFilterService
    {
        Task<IEnumerable<Filter>> ListAsync();
        Task<Response<Filter>> GetFilterAsync(int id);
        Task<Filter> SaveAsync(Filter filter);
        Task<Response<Filter>> UpdateAsync(int id, Filter filter);
        Task<Response<Filter>> DeleteAsync(int id);
    }
}