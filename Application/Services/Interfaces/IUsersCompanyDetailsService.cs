using System.Threading.Tasks;
using Application.Responses;
using Domain.Models;

namespace Application.Services.Interfaces
{
    public interface IUsersCompanyDetailsService
    {
        Task<UsersCompanyDetails> FindByIdAsync(int id);
        Task<Response<UsersCompanyDetails>> UpdateAsync(int id, UsersCompanyDetails usersCompanyDetails);
    }
}