using Application.Responses;
using Application.Services.Interfaces;
using Domain.Models;
using Persistence.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Services
{
    public class MonitorService : IMonitorService
    {
        private readonly IMonitorRepository _monitorRepository;
        private readonly IUnitOfWork _unitOfWork;
        public MonitorService(IMonitorRepository monitorRepository, IUnitOfWork unitOfWork)
        {
            _monitorRepository = monitorRepository;
            _unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<Monitor>> ListAsync()
        {
            return await _monitorRepository.ListAsync();
        }

        public async Task<Monitor> SaveAsync(Monitor monitor)
        {
            await _monitorRepository.AddAsync(monitor);
            await _unitOfWork.CommitTransactionAsync();

            return monitor;
        }

        public async Task<Response<Monitor>> UpdateAsync(int id, Monitor monitor)
        {
            var existingMonitor = await _monitorRepository.FindByIdAsync(id);

            if (existingMonitor == null)
                return new Response<Monitor>(string.Format("Monitor with id:{0} not found", id));

            existingMonitor.Name = monitor.Name;
            existingMonitor.Producer = monitor.Producer;
            existingMonitor.SaleReason = monitor.SaleReason;
            existingMonitor.DestinationId = monitor.DestinationId;
            existingMonitor.Tested = monitor.Tested;
            existingMonitor.Price = monitor.Price;
            existingMonitor.Quantity = monitor.Quantity;
            existingMonitor.InterestId = monitor.InterestId;
            existingMonitor.ServiceTag = monitor.ServiceTag;
            existingMonitor.AdminsToDo = monitor.AdminsToDo;
            existingMonitor.InterfacePorts = monitor.InterfacePorts;
            existingMonitor.Comment = monitor.Comment;
            existingMonitor.Weight = monitor.Weight;
            existingMonitor.Length = monitor.Length;
            existingMonitor.Height = monitor.Height;
            existingMonitor.ScreenResolution = monitor.ScreenResolution;
            existingMonitor.Diagonal = monitor.Diagonal;
            existingMonitor.Matrix = monitor.Matrix;
            existingMonitor.Refreshing = monitor.Refreshing;
            existingMonitor.Contrast = monitor.Contrast;
            existingMonitor.HasSpeakers = monitor.HasSpeakers;
            existingMonitor.HasTouchScreen = monitor.HasTouchScreen;
            existingMonitor.StorageId = monitor.StorageId;

            _monitorRepository.Update(existingMonitor);
            await _unitOfWork.CommitTransactionAsync();

            return new Response<Monitor>(existingMonitor);
        }

        public async Task<Response<Monitor>> DeleteAsync(int id)
        {
            var existingMonitor = await _monitorRepository.FindByIdAsync(id);

            if (existingMonitor == null)
                return new Response<Monitor>(string.Format("Monitor with id:{0} not found", id));

            _monitorRepository.Remove(existingMonitor);
            await _unitOfWork.CommitTransactionAsync();

            return new Response<Monitor>(existingMonitor);
        }

        public async Task<IEnumerable<Monitor>> ListWithFiltersAsync(DeviceFilter filter)
        {
            return await _monitorRepository.ListWithFiltersAsync(filter);
        }

        public async Task<Monitor> FindByIdAsync(int id)
        {
            return await _monitorRepository.FindByIdAsync(id);
        }
    }
}
