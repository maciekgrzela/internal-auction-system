using Domain.Models;

namespace Application.Services.Interfaces
{
    public interface IJwtGenerator
    {
        string CreateToken(AppUser appUser, string role);
    }
}