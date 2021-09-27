using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Contexts;
using Persistence.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class StorageRepository : BaseRepository, IStorageRepository
    {
        public StorageRepository(DataContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Storage>> ListAsync()
        {
            return await _context.Storages.Include(p => p.Location).ToListAsync();
        }

        public async Task AddAsync(Storage storage)
        {
            await _context.Storages.AddAsync(storage);
        }

        public async Task<Storage> FindByIdAsync(int id)
        {
            return await _context.Storages.FindAsync(id);
        }

        public void Update(Storage storage)
        {
            _context.Storages.Update(storage);
        }

        public void Remove(Storage storage)
        {
            _context.Storages.Remove(storage);
        }

        public async Task<Storage> GetByIdAsync(int id)
        {
            return await _context.Storages.Include(p => p.Location).FirstOrDefaultAsync(p => p.Id == id);
        }
    }
}
