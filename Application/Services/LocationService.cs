using Application.Responses;
using Application.Services.Interfaces;
using Domain.Models;
using Persistence.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Services
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepository _locationRepository;
        private readonly IUnitOfWork _unitOfWork;
        public LocationService(ILocationRepository locationRepository, IUnitOfWork unitOfWork)
        {
            _locationRepository = locationRepository;
            _unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<Location>> ListAsync()
        {
            return await _locationRepository.ListAsync();
        }

        public async Task<Response<Location>> GetLocationAsync(int id)
        {
            var existingLocation = await _locationRepository.FindByIdAsync(id);

            if (existingLocation == null)
                return new Response<Location>(string.Format("Location with id:{0} not found", id));

            return new Response<Location>(existingLocation);
        }

        public async Task<Location> SaveAsync(Location location)
        {
            await _locationRepository.AddAsync(location);
            await _unitOfWork.CommitTransactionAsync();

            return location;
        }

        public async Task<Response<Location>> UpdateAsync(int id, Location location)
        {
            var existingLocation = await _locationRepository.FindByIdAsync(id);

            if (existingLocation == null)
                return new Response<Location>(string.Format("Location with id:{0} not found", id));

            existingLocation.Street = location.Street;
            existingLocation.Number = location.Number;
            existingLocation.PostalCode = location.PostalCode;
            existingLocation.City = location.City;

            _locationRepository.Update(existingLocation);
            await _unitOfWork.CommitTransactionAsync();

            return new Response<Location>(existingLocation);
        }

        public async Task<Response<Location>> DeleteAsync(int id)
        {
            var existingLocation = await _locationRepository.FindByIdAsync(id);

            if (existingLocation == null)
                return new Response<Location>(string.Format("Location with id:{0} not found", id));

            _locationRepository.Remove(existingLocation);
            await _unitOfWork.CommitTransactionAsync();

            return new Response<Location>(existingLocation);
        }


    }
}
