using System.Threading.Tasks;
using Domain.Models;
using Persistence.Contexts;
using Persistence.Repositories.Interfaces;

namespace Persistence.Repositories
{
    public class UsersCompanyDetailsRepository : BaseRepository, IUsersCompanyDetailsRepository
    {

        public UsersCompanyDetailsRepository(DataContext context) : base(context) { }

        public async Task<UsersCompanyDetails> FindByIdAsync(int id)
        {
            return await _context.UsersCompanyDetails.FindAsync(id);
        }

        public void Update(UsersCompanyDetails usersCompanyDetails)
        {
            _context.UsersCompanyDetails.Update(usersCompanyDetails);
        }
    }
}