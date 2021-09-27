using System.Threading.Tasks;
using Domain.Models;

namespace Persistence.Repositories.Interfaces
{
    public interface IUsersCompanyDetailsRepository
    {
        Task<UsersCompanyDetails> FindByIdAsync(int id);
        void Update(UsersCompanyDetails usersCompanyDetails);
    }
}