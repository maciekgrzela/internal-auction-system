using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Contexts;
using Persistence.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class OtherDeviceRepository : BaseRepository, IOtherDeviceRepository
    {
        public OtherDeviceRepository(DataContext context) : base(context) { }

        public async Task<IEnumerable<OtherDevice>> ListAsync()
        {
            return await _context.OtherDevices.Include(p => p.Destination).Include(p => p.Interest).Include(p => p.Storage.Location).ToListAsync();
        }

        public async Task AddAsync(OtherDevice otherDevice)
        {
            otherDevice.Created = DateTime.Now;
            await _context.OtherDevices.AddAsync(otherDevice);
        }

        public async Task<OtherDevice> FindByIdAsync(int id)
        {
            return await _context.OtherDevices.FindAsync(id);
        }

        public void Update(OtherDevice otherDevice)
        {
            _context.OtherDevices.Update(otherDevice);
        }

        public void Remove(OtherDevice otherDevice)
        {
            _context.OtherDevices.Remove(otherDevice);
        }

        public async Task<IEnumerable<OtherDevice>> ListWithFiltersAsync(DeviceFilter filter)
        {
            IQueryable<OtherDevice> otherDevicesList = _context.OtherDevices;

            otherDevicesList = AddNameFilterAsync(otherDevicesList, filter);
            otherDevicesList = AddTypeFilterAsync(otherDevicesList, filter);
            otherDevicesList = AddMinPriceFilter(otherDevicesList, filter);
            otherDevicesList = AddMaxPriceFilter(otherDevicesList, filter);
            otherDevicesList = AddLocationFilter(otherDevicesList, filter);
            otherDevicesList = AddDestinationFilter(otherDevicesList, filter);
            otherDevicesList = AddInterestFilter(otherDevicesList, filter);
            otherDevicesList = AddInterfacePortsFilter(otherDevicesList, filter);
            otherDevicesList = AddScreenResolutionFilter(otherDevicesList, filter);
            otherDevicesList = AddTouchScreenFilter(otherDevicesList, filter);
            otherDevicesList = AddSpeakersFilter(otherDevicesList, filter);
            otherDevicesList = AddDiagonalFilter(otherDevicesList, filter);
            otherDevicesList = AddContrastFilter(otherDevicesList, filter);
            otherDevicesList = AddRefreshingFilter(otherDevicesList, filter);
            otherDevicesList = AddMatrixFilter(otherDevicesList, filter);
            otherDevicesList = AddExtensionCardsFilter(otherDevicesList, filter);

            return await otherDevicesList.Include(p => p.Destination).Include(p => p.Interest).Include(p => p.Storage.Location).ToListAsync();
        }


        private IQueryable<OtherDevice> AddNameFilterAsync(IQueryable<OtherDevice> otherDevices, DeviceFilter filter)
        {
            if (!string.IsNullOrEmpty(filter?.Name))
            {
                otherDevices = otherDevices.Where(x => x.Name.Contains(filter.Name));
            }
            return otherDevices;
        }

        private IQueryable<OtherDevice> AddTypeFilterAsync(IQueryable<OtherDevice> otherDevices, DeviceFilter filter)
        {
            if (filter?.Type != null && filter?.Type.Count() > 0)
            {
                otherDevices = otherDevices.Where(x => filter.Type.Contains(x.Type));
            }
            return otherDevices;
        }

        private IQueryable<OtherDevice> AddMinPriceFilter(IQueryable<OtherDevice> otherDevices, DeviceFilter filter)
        {
            if (filter?.MinPrice != null)
            {
                otherDevices = otherDevices.Where(x => x.Price >= filter.MinPrice);
            }
            return otherDevices;
        }

        private IQueryable<OtherDevice> AddMaxPriceFilter(IQueryable<OtherDevice> otherDevices, DeviceFilter filter)
        {
            if (filter?.MaxPrice != null)
            {
                otherDevices = otherDevices.Where(x => x.Price <= filter.MaxPrice);
            }
            return otherDevices;
        }

        private IQueryable<OtherDevice> AddLocationFilter(IQueryable<OtherDevice> otherDevices, DeviceFilter filter)
        {
            if (filter?.LocationIds != null && filter?.LocationIds.Count() > 0)
            {
                otherDevices = otherDevices.Where(x => x.Storage != null && x.Storage.Location != null).Where(x => filter.LocationIds.Contains(x.Storage.Location.Id));
            }
            return otherDevices;
        }

        private IQueryable<OtherDevice> AddDestinationFilter(IQueryable<OtherDevice> otherDevices, DeviceFilter filter)
        {
            if (filter?.DestinationIds != null && filter?.DestinationIds.Count() > 0)
            {
                otherDevices = otherDevices.Where(x => x.Destination != null).Where(x => filter.DestinationIds.Contains(x.Destination.Id));
            }
            return otherDevices;
        }

        private IQueryable<OtherDevice> AddInterestFilter(IQueryable<OtherDevice> otherDevices, DeviceFilter filter)
        {
            if (filter?.InterestIds != null && filter?.InterestIds.Count() > 0)
            {
                otherDevices = otherDevices.Where(x => x.Interest != null).Where(x => filter.InterestIds.Contains(x.Interest.Id));
            }
            return otherDevices;
        }

        private IQueryable<OtherDevice> AddInterfacePortsFilter(IQueryable<OtherDevice> otherDevices, DeviceFilter filter)
        {
            if (filter?.InterfacePorts != null && filter?.InterfacePorts.Count() > 0)
            {
                var filtered = otherDevices;
                foreach (var interfacePortsFilter in filter.InterfacePorts)
                {
                    filtered = filtered.Where(x => x.InterfacePorts.Contains(interfacePortsFilter));
                }
                otherDevices = filtered;
            }
            return otherDevices;
        }

        private IQueryable<OtherDevice> AddDiagonalFilter(IQueryable<OtherDevice> otherDevices, DeviceFilter filter){
            if(filter?.Diagonal != null && filter?.Diagonal.Count() > 0){
                otherDevices = otherDevices.Where(x => false);
            }
            return otherDevices;
        }

        private IQueryable<OtherDevice> AddScreenResolutionFilter(IQueryable<OtherDevice> otherDevices, DeviceFilter filter)
        {
            if (filter?.ScreenResolution != null && filter?.ScreenResolution.Count() > 0)
            {
                otherDevices = otherDevices.Where(x => false);
            }
            return otherDevices;
        }

        private IQueryable<OtherDevice> AddTouchScreenFilter(IQueryable<OtherDevice> otherDevices, DeviceFilter filter)
        {
            if (filter?.HasTouchScreen != null)
            {
                otherDevices = otherDevices.Where(x => false);
            }
            return otherDevices;
        }

        private IQueryable<OtherDevice> AddSpeakersFilter(IQueryable<OtherDevice> otherDevices, DeviceFilter filter)
        {
            if (filter?.HasSpeakers != null)
            {
                otherDevices = otherDevices.Where(x => false);
            }
            return otherDevices;
        }

        private IQueryable<OtherDevice> AddContrastFilter(IQueryable<OtherDevice> otherDevices, DeviceFilter filter)
        {
            if (filter?.Contrast != null && filter?.Contrast.Count() > 0)
            {
                otherDevices = otherDevices.Where(x => false);
            }
            return otherDevices;
        }

        private IQueryable<OtherDevice> AddRefreshingFilter(IQueryable<OtherDevice> otherDevices, DeviceFilter filter)
        {
            if (filter?.Refreshing != null && filter?.Refreshing.Count() > 0)
            {
                otherDevices = otherDevices.Where(x => false);
            }
            return otherDevices;
        }

        private IQueryable<OtherDevice> AddMatrixFilter(IQueryable<OtherDevice> otherDevices, DeviceFilter filter)
        {
            if (filter?.Matrix != null && filter?.Matrix.Count() > 0)
            {
                otherDevices = otherDevices.Where(x => false);
            }
            return otherDevices;
        }

        private IQueryable<OtherDevice> AddExtensionCardsFilter(IQueryable<OtherDevice> otherDevices, DeviceFilter filter)
        {
            if (filter?.ExtensionsCards != null && filter?.ExtensionsCards.Count() > 0)
            {
                otherDevices = otherDevices.Where(x => false);
            }
            return otherDevices;
        }
    }
}
