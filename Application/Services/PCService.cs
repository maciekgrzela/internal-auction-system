using Application.Responses;
using Application.Services.Interfaces;
using Domain.Models;
using Persistence.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Services
{
    public class PCService : IPCService
    {
        private readonly IPCRepository _pcRepository;
        private readonly IUnitOfWork _unitOfWork;
        public PCService(IPCRepository pcRepository, IUnitOfWork unitOfWork)
        {
            _pcRepository = pcRepository;
            _unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<PC>> ListAsync()
        {
            return await _pcRepository.ListAsync();
        }

        public async Task<PC> SaveAsync(PC pc)
        {
            await _pcRepository.AddAsync(pc);
            await _unitOfWork.CommitTransactionAsync();

            return pc;
        }

        public async Task<Response<PC>> UpdateAsync(int id, PC pc)
        {
            var existingPC = await _pcRepository.FindByIdAsync(id);

            if (existingPC == null)
                return new Response<PC>(string.Format("Computer with id:{0} not found", id));

            existingPC.Name = pc.Name;
            existingPC.Type = pc.Type;
            existingPC.Producer = pc.Producer;
            existingPC.SaleReason = pc.SaleReason;
            existingPC.DestinationId = pc.DestinationId;
            existingPC.Tested = pc.Tested;
            existingPC.Price = pc.Price;
            existingPC.Quantity = pc.Quantity;
            existingPC.InterestId = pc.InterestId;
            existingPC.ServiceTag = pc.ServiceTag;
            existingPC.AdminsToDo = pc.AdminsToDo;
            existingPC.InterfacePorts = pc.InterfacePorts;
            existingPC.Comment = pc.Comment;
            existingPC.Weight = pc.Weight;
            existingPC.Length = pc.Length;
            existingPC.Height = pc.Height;
            existingPC.Processor = pc.Processor;
            existingPC.MemoryAmount = pc.MemoryAmount;
            existingPC.GraphicsCard = pc.GraphicsCard;
            existingPC.DiskDrive = pc.DiskDrive;
            existingPC.ExtensionsCards = pc.ExtensionsCards;
            existingPC.OperatingSystem = pc.OperatingSystem;
            existingPC.StorageId = pc.StorageId;

            _pcRepository.Update(existingPC);
            await _unitOfWork.CommitTransactionAsync();

            return new Response<PC>(existingPC);

        }

        public async Task<Response<PC>> DeleteAsync(int id)
        {
            var existingPC = await _pcRepository.FindByIdAsync(id);

            if (existingPC == null)
                return new Response<PC>(string.Format("Computer with id:{0} not found", id));


            _pcRepository.Remove(existingPC);
            await _unitOfWork.CommitTransactionAsync();

            return new Response<PC>(existingPC);
        }

        public async Task<IEnumerable<PC>> ListWithFiltersAsync(DeviceFilter filter)
        {
            return await _pcRepository.ListWithFiltersAsync(filter);
        }

        public async Task<PC> FindByIdAsync(int id)
        {
            return await _pcRepository.FindByIdAsync(id);
        }
    }
}
