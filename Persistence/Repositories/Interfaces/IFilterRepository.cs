using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Models;

namespace Persistence.Repositories.Interfaces
{
    public interface IFilterRepository
    {
        Task<IEnumerable<Filter>> ListAsync();
        Task AddAsync(Filter filter);
        Task<Filter> FindByIdAsync(int id);
        void Update(Filter filter);
        void Remove(Filter filter);
    }
}