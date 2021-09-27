using Application.Responses;
using Application.Services.Interfaces;
using Domain.Models;
using Persistence.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Services
{
    public class StorageService : IStorageService
    {
        private readonly IStorageRepository _storageRepository;
        private readonly IUnitOfWork _unitOfWork;
        public StorageService(IStorageRepository storageRepository, IUnitOfWork unitOfWork)
        {
            _storageRepository = storageRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Storage>> ListAsync()
        {
            return await _storageRepository.ListAsync();
        }

        public async Task<Response<Storage>> GetStorageAsync(int id)
        {
            var existingStorage = await _storageRepository.GetByIdAsync(id);

            if (existingStorage == null)
                return new Response<Storage>(string.Format("Storage with id:{0} not found", id));

            return new Response<Storage>(existingStorage);
        }

        public async Task<Storage> SaveAsync(Storage storage)
        {
            await _storageRepository.AddAsync(storage);
            await _unitOfWork.CommitTransactionAsync();

            return storage;
        }

        public async Task<Response<Storage>> UpdateAsync(int id, Storage storage)
        {
            var existingStorage = await _storageRepository.FindByIdAsync(id);

            if (existingStorage == null)
                return new Response<Storage>(string.Format("Storage with id:{0} not found", id));

            existingStorage.Name = storage.Name;
            existingStorage.Description = storage.Description;
            existingStorage.LocationId = storage.LocationId;

            _storageRepository.Update(existingStorage);
            await _unitOfWork.CommitTransactionAsync();

            return new Response<Storage>(existingStorage);
        }

        public async Task<Response<Storage>> DeleteAsync(int id)
        {
            var existingStorage = await _storageRepository.FindByIdAsync(id);

            if (existingStorage == null)
                return new Response<Storage>(string.Format("Storage with id:{0} not found", id));

            _storageRepository.Remove(existingStorage);
            await _unitOfWork.CommitTransactionAsync();

            return new Response<Storage>(existingStorage);
        }

    }
}
