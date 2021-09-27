using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Responses;
using Application.Services.Interfaces;
using Domain.Models;
using Persistence.Repositories.Interfaces;

namespace Application.Services
{
    public class FilterService : IFilterService
    {

        private readonly IFilterRepository _filterRepository;
        private readonly IUnitOfWork _unitOfWork;

        public FilterService(IFilterRepository filterRepository, IUnitOfWork unitOfWork)
        {
            _filterRepository = filterRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Response<Filter>> DeleteAsync(int id)
        {
            var existingFilter = await _filterRepository.FindByIdAsync(id);

            if (existingFilter == null)
                return new Response<Filter>(string.Format("Storage with id:{0} not found", id));

            _filterRepository.Remove(existingFilter);
            await _unitOfWork.CommitTransactionAsync();

            return new Response<Filter>(existingFilter);
        }

        public async Task<Response<Filter>> GetFilterAsync(int id)
        {
            var existingFilter = await _filterRepository.FindByIdAsync(id);

            if (existingFilter == null)
                return new Response<Filter>(string.Format("Filter with id:{0} not found", id));

            return new Response<Filter>(existingFilter);
        }

        public async Task<IEnumerable<Filter>> ListAsync()
        {
            return await _filterRepository.ListAsync();
        }

        public async Task<Filter> SaveAsync(Filter filter)
        {
            await _filterRepository.AddAsync(filter);
            await _unitOfWork.CommitTransactionAsync();

            return filter;
        }

        public async Task<Response<Filter>> UpdateAsync(int id, Filter filter)
        {
            var existingFilter = await _filterRepository.FindByIdAsync(id);

            if (existingFilter == null)
                return new Response<Filter>(string.Format("Filter with id:{0} not found", id));

            existingFilter.Name = filter.Name;
            existingFilter.Value = filter.Value;

            _filterRepository.Update(existingFilter);
            await _unitOfWork.CommitTransactionAsync();

            return new Response<Filter>(existingFilter);
        }
    }
}