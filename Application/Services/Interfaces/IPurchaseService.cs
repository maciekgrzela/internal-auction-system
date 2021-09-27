using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Responses;
using Domain.Models;

namespace Application.Services.Interfaces
{
    public interface IPurchaseService
    {
        Task<Response<Purchase>> SaveAsync(Purchase purchase);
        Task<Response<List<Purchase>>> ListAsync();
    }
}