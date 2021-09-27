using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Contexts;
using Persistence.Repositories.Interfaces;

namespace Persistence.Repositories
{
    public class FilterRepository : BaseRepository, IFilterRepository
    {


        public FilterRepository(DataContext context) : base(context)
        {
        }

        public async Task AddAsync(Filter filter)
        {
            await _context.Filters.AddAsync(filter);
        }

        public async Task<Filter> FindByIdAsync(int id)
        {
            return await _context.Filters.FindAsync(id);
        }

        public async Task<IEnumerable<Filter>> ListAsync()
        {
            return await _context.Filters.ToListAsync();
        }

        public void Remove(Filter filter)
        {
            _context.Filters.Remove(filter);
        }

        public void Update(Filter filter)
        {
            _context.Filters.Update(filter);
        }
    }
}
