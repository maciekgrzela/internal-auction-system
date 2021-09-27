using Application.Responses;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Models;
using Persistence.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Services
{
    public class LaptopService : ILaptopService
    {
        private readonly ILaptopRepository _laptopRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public LaptopService(ILaptopRepository laptopRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _laptopRepository = laptopRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Laptop>> ListAsync()
        {
            return await _laptopRepository.ListAsync();
        }

        public async Task<Laptop> SaveAsync(Laptop laptop)
        {
            await _laptopRepository.AddAsync(laptop);
            await _unitOfWork.CommitTransactionAsync();
            return laptop;
        }

        public async Task<Response<Laptop>> UpdateAsync(int id, Laptop laptop)
        {
            var existingLaptop = await _laptopRepository.FindByIdAsync(id);

            if (existingLaptop == null)
                return new Response<Laptop>(string.Format("Laptop with id:{0} not found", id));

            existingLaptop.Name = laptop.Name;
            existingLaptop.Producer = laptop.Producer;
            existingLaptop.SaleReason = laptop.SaleReason;
            existingLaptop.DestinationId = laptop.DestinationId;
            existingLaptop.Tested = laptop.Tested;
            existingLaptop.Price = laptop.Price;
            existingLaptop.Quantity = laptop.Quantity;
            existingLaptop.InterestId = laptop.InterestId;
            existingLaptop.ServiceTag = laptop.ServiceTag;
            existingLaptop.AdminsToDo = laptop.AdminsToDo;
            existingLaptop.InterfacePorts = laptop.InterfacePorts;
            existingLaptop.Comment = laptop.Comment;
            existingLaptop.Weight = laptop.Weight;
            existingLaptop.Length = laptop.Length;
            existingLaptop.Height = laptop.Height;
            existingLaptop.Processor = laptop.Processor;
            existingLaptop.MemoryAmount = laptop.MemoryAmount;
            existingLaptop.GraphicsCard = laptop.GraphicsCard;
            existingLaptop.DiskDrive = laptop.DiskDrive;
            existingLaptop.ScreenResolution = laptop.ScreenResolution;
            existingLaptop.OperatingSystem = laptop.OperatingSystem;
            existingLaptop.HasTouchScreen = laptop.HasTouchScreen;
            existingLaptop.StorageId = laptop.StorageId;

            _laptopRepository.Update(existingLaptop);
            await _unitOfWork.CommitTransactionAsync();

            return new Response<Laptop>(existingLaptop);
        }

        public async Task<Response<Laptop>> DeleteAsync(int id)
        {
            var existingLaptop = await _laptopRepository.FindByIdAsync(id);

            if (existingLaptop == null)
                return new Response<Laptop>(string.Format("Laptop with id:{0} not found", id));

            _laptopRepository.Remove(existingLaptop);
            await _unitOfWork.CommitTransactionAsync();

            return new Response<Laptop>(existingLaptop);
        }

        public async Task<IEnumerable<Laptop>> ListWithFiltersAsync(DeviceFilter filter)
        {
            return await _laptopRepository.ListWithFiltersAsync(filter);
        }

        public async Task<Laptop> FindByIdAsync(int id)
        {
            return await _laptopRepository.FindByIdAsync(id);
        }
    }
}
