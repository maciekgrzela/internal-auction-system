using System.Threading.Tasks;
using Application.Responses;
using Domain.Models;

namespace Application.Services.Interfaces
{
    public interface IUserService
    {
        Task<Response<ReturnedUser>> Login(User user);
        Task<Response<ReturnedUser>> Register(User user, string userRole);
        Task<Response<ReturnedUser>> CurrentUser();
        Task<AppUser> CurrentAppUser();
        Task<AppUser> FindByIdAsync(string id);
        Task<Response<AppUser>> UpdateCompanyDetails(string id, UsersCompanyDetails usersCompanyDetails);

    }
}