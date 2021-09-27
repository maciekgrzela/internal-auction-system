using Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Persistence.Repositories.Interfaces
{
    public interface IStorageRepository
    {
        Task<IEnumerable<Storage>> ListAsync();
        Task AddAsync(Storage storage);
        Task<Storage> FindByIdAsync(int id);
        Task<Storage> GetByIdAsync(int id);
        void Update(Storage storage);
        void Remove(Storage storage);
    }
}
