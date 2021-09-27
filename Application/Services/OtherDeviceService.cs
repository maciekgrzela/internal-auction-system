using Application.Responses;
using Application.Services.Interfaces;
using Domain.Models;
using Persistence.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Services
{
    public class OtherDeviceService : IOtherDeviceService
    {
        private readonly IOtherDeviceRepository _otherDeviceRepository;
        private readonly IUnitOfWork _unitOfWork;
        public OtherDeviceService(IOtherDeviceRepository otherDeviceRepository, IUnitOfWork unitOfWork)
        {
            _otherDeviceRepository = otherDeviceRepository;
            _unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<OtherDevice>> ListAsync()
        {
            return await _otherDeviceRepository.ListAsync();
        }

        public async Task<OtherDevice> SaveAsync(OtherDevice otherDevice)
        {
            await _otherDeviceRepository.AddAsync(otherDevice);
            await _unitOfWork.CommitTransactionAsync();

            return otherDevice;
        }

        public async Task<Response<OtherDevice>> UpdateAsync(int id, OtherDevice otherDevice)
        {
            var existingOtherDevice = await _otherDeviceRepository.FindByIdAsync(id);

            if (existingOtherDevice == null)
                return new Response<OtherDevice>(string.Format("Other device with id:{0} not found", id));

            existingOtherDevice.Name = otherDevice.Name;
            existingOtherDevice.Type = otherDevice.Type;
            existingOtherDevice.Producer = otherDevice.Producer;
            existingOtherDevice.SaleReason = otherDevice.SaleReason;
            existingOtherDevice.DestinationId = otherDevice.DestinationId;
            existingOtherDevice.Tested = otherDevice.Tested;
            existingOtherDevice.Price = otherDevice.Price;
            existingOtherDevice.Quantity = otherDevice.Quantity;
            existingOtherDevice.InterestId = otherDevice.InterestId;
            existingOtherDevice.ServiceTag = otherDevice.ServiceTag;
            existingOtherDevice.AdminsToDo = otherDevice.AdminsToDo;
            existingOtherDevice.InterfacePorts = otherDevice.InterfacePorts;
            existingOtherDevice.Comment = otherDevice.Comment;
            existingOtherDevice.Weight = otherDevice.Weight;
            existingOtherDevice.Length = otherDevice.Length;
            existingOtherDevice.Height = otherDevice.Height;
            existingOtherDevice.Description = otherDevice.Description;
            existingOtherDevice.Features = otherDevice.Features;
            existingOtherDevice.StorageId = otherDevice.StorageId;

            _otherDeviceRepository.Update(existingOtherDevice);
            await _unitOfWork.CommitTransactionAsync();

            return new Response<OtherDevice>(existingOtherDevice);
        }

        public async Task<Response<OtherDevice>> DeleteAsync(int id)
        {
            var existingOtherDevice = await _otherDeviceRepository.FindByIdAsync(id);

            if (existingOtherDevice == null)
                return new Response<OtherDevice>(string.Format("Other device with id:{0} not found", id));

            _otherDeviceRepository.Remove(existingOtherDevice);
            await _unitOfWork.CommitTransactionAsync();

            return new Response<OtherDevice>(existingOtherDevice);
        }

        public async Task<IEnumerable<OtherDevice>> ListWithFiltersAsync(DeviceFilter filter)
        {
            return await _otherDeviceRepository.ListWithFiltersAsync(filter);
        }

        public async Task<OtherDevice> FindByIdAsync(int id)
        {
            return await _otherDeviceRepository.FindByIdAsync(id);
        }
    }
}
