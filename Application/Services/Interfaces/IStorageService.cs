using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Responses;
using Domain.Models;

namespace Application.Services.Interfaces
{
    public interface IStorageService
    {
        Task<IEnumerable<Storage>> ListAsync();
        Task<Response<Storage>> GetStorageAsync(int id);
        Task<Storage> SaveAsync(Storage Storage);
        Task<Response<Storage>> UpdateAsync(int id, Storage Storage);
        Task<Response<Storage>> DeleteAsync(int id);
    }
}