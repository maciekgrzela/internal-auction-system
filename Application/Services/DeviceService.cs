using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Resources;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Models;

namespace Application.Services
{
    public class DeviceService : IDeviceService
    {
        private readonly ILaptopService _laptopService;
        private readonly IMonitorService _monitorService;
        private readonly IPCService _pcService;
        private readonly IOtherDeviceService _otherDeviceService;
        private readonly IMapper _mapper;

        public DeviceService(ILaptopService laptopService, IMonitorService monitorService, IPCService pcService, IOtherDeviceService otherDeviceService, IMapper mapper)
        {
            _otherDeviceService = otherDeviceService;
            _mapper = mapper;
            _pcService = pcService;
            _monitorService = monitorService;
            _laptopService = laptopService;
        }

        public async Task<DeviceResource> FindDeviceAsync(int id, string type)
        {
            DeviceResource returnedDevice;
            Console.WriteLine(string.Format("FindDeviceAsync {0} {1}", id, type));
            switch (type)
            {
                case "laptop":
                    var laptop = await _laptopService.FindByIdAsync(id);
                    returnedDevice = _mapper.Map<Laptop, DeviceResource>(laptop);
                    break;
                case "monitor":
                    var monitor = await _monitorService.FindByIdAsync(id);
                    returnedDevice = _mapper.Map<Monitor, DeviceResource>(monitor);
                    break;
                case "otherdevice":
                    var otherdevice = await _otherDeviceService.FindByIdAsync(id);
                    returnedDevice = _mapper.Map<OtherDevice, DeviceResource>(otherdevice);
                    break;
                case "pc":
                    var pc = await _pcService.FindByIdAsync(id);
                    returnedDevice = _mapper.Map<PC, DeviceResource>(pc);
                    break;
                default:
                    returnedDevice = null;
                    break;
            }
            return returnedDevice;
        }

        public async Task ModifyQuantity(int id, string type, int quantity)
        {
            switch (type)
            {
                case "laptop":
                    var laptop = await _laptopService.FindByIdAsync(id);
                    laptop.Quantity = laptop.Quantity - quantity;
                    await _laptopService.UpdateAsync(id, laptop);
                    break;
                case "monitor":
                    var monitor = await _monitorService.FindByIdAsync(id);
                    monitor.Quantity = monitor.Quantity - quantity;
                    await _monitorService.UpdateAsync(id, monitor);
                    break;
                case "otherdevice":
                    var otherDevice = await _otherDeviceService.FindByIdAsync(id);
                    otherDevice.Quantity = otherDevice.Quantity - quantity;
                    await _otherDeviceService.UpdateAsync(id, otherDevice);
                    break;
                case "pc":
                    var pc = await _pcService.FindByIdAsync(id);
                    pc.Quantity = pc.Quantity - quantity;
                    await _pcService.UpdateAsync(id, pc);
                    break;
            }
        }

        public async Task<IEnumerable<DeviceResource>> ListAsync(DeviceFilterResource filterDeviceResource = null)
        {

            var deviceFilter = _mapper.Map<DeviceFilter>(filterDeviceResource);

            var laptops = await _laptopService.ListWithFiltersAsync(deviceFilter);
            var monitors = await _monitorService.ListWithFiltersAsync(deviceFilter);
            var pcs = await _pcService.ListWithFiltersAsync(deviceFilter);
            var otherDevices = await _otherDeviceService.ListWithFiltersAsync(deviceFilter);

            var resLaptops = _mapper.Map<IEnumerable<Laptop>, IEnumerable<DeviceResource>>(laptops);
            var resMonitors = _mapper.Map<IEnumerable<Monitor>, IEnumerable<DeviceResource>>(monitors);
            var resPCs = _mapper.Map<IEnumerable<PC>, IEnumerable<DeviceResource>>(pcs);
            var resOtherDevices = _mapper.Map<IEnumerable<OtherDevice>, IEnumerable<DeviceResource>>(otherDevices);

            var resources = resLaptops.Concat(resMonitors).Concat(resPCs).Concat(resOtherDevices);
            resources = resources.OrderByDescending(x => x.Created);

            return resources;
        }
    }
}