using System.Threading.Tasks;
using Application.Responses;
using Application.Services.Interfaces;
using Domain.Models;
using Persistence.Repositories.Interfaces;

namespace Application.Services
{
    public class UsersCompanyDetailsService : IUsersCompanyDetailsService
    {
        private readonly IUsersCompanyDetailsRepository _usersCompanyDetailsRepository;
        private readonly IUnitOfWork _unitOfWork;

        public UsersCompanyDetailsService(IUsersCompanyDetailsRepository usersCompanyDetailsRepository, IUnitOfWork unitOfWork)
        {
            _usersCompanyDetailsRepository = usersCompanyDetailsRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<UsersCompanyDetails> FindByIdAsync(int id)
        {
            return await _usersCompanyDetailsRepository.FindByIdAsync(id);
        }

        public async Task<Response<UsersCompanyDetails>> UpdateAsync(int id, UsersCompanyDetails usersCompanyDetails)
        {
            var companyDetails = await FindByIdAsync(id);
            if (companyDetails == null)
            {
                return new Response<UsersCompanyDetails>(string.Format("Company details with id:{0} not found", id));
            }
            companyDetails.Name = usersCompanyDetails.Name;
            companyDetails.Street = usersCompanyDetails.Street;
            companyDetails.Number = usersCompanyDetails.Number;
            companyDetails.PostalCode = usersCompanyDetails.PostalCode;
            companyDetails.City = usersCompanyDetails.City;
            companyDetails.NIP = usersCompanyDetails.NIP;
            companyDetails.PhoneNumber = usersCompanyDetails.PhoneNumber;

            _usersCompanyDetailsRepository.Update(companyDetails);
            await _unitOfWork.CommitTransactionAsync();

            return new Response<UsersCompanyDetails>(companyDetails);
        }
    }
}