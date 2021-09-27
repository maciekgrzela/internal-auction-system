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
    public class MonitorRepository : BaseRepository, IMonitorRepository
    {
        public MonitorRepository(DataContext context) : base(context) { }

        public async Task<IEnumerable<Monitor>> ListAsync()
        {
            return await _context.Monitors.Include(p => p.Destination).Include(p => p.Interest).Include(p => p.Storage.Location).ToListAsync();
        }

        public async Task AddAsync(Monitor monitor)
        {
            monitor.Created = DateTime.Now;
            await _context.Monitors.AddAsync(monitor);
        }

        public async Task<Monitor> FindByIdAsync(int id)
        {
            return await _context.Monitors.FindAsync(id);
        }

        public void Update(Monitor monitor)
        {
            _context.Monitors.Update(monitor);
        }

        public void Remove(Monitor monitor)
        {
            _context.Monitors.Remove(monitor);
        }

        public async Task<IEnumerable<Monitor>> ListWithFiltersAsync(DeviceFilter filter)
        {
            IQueryable<Monitor> monitorList = _context.Monitors;

            monitorList = AddNameFilterAsync(monitorList, filter);
            monitorList = AddTypeFilterAsync(monitorList, filter);
            monitorList = AddMinPriceFilter(monitorList, filter);
            monitorList = AddMaxPriceFilter(monitorList, filter);
            monitorList = AddLocationFilter(monitorList, filter);
            monitorList = AddDestinationFilter(monitorList, filter);
            monitorList = AddInterestFilter(monitorList, filter);
            monitorList = AddInterfacePortsFilter(monitorList, filter);
            monitorList = AddScreenResolutionFilter(monitorList, filter);
            monitorList = AddTouchScreenFilter(monitorList, filter);
            monitorList = AddSpeakersFilter(monitorList, filter);
            monitorList = AddDiagonalFilter(monitorList, filter);
            monitorList = AddContrastFilter(monitorList, filter);
            monitorList = AddRefreshingFilter(monitorList, filter);
            monitorList = AddMatrixFilter(monitorList, filter);
            monitorList = AddExtensionCardsFilter(monitorList, filter);

            return await monitorList.Include(p => p.Destination).Include(p => p.Interest).Include(p => p.Storage.Location).ToListAsync();
        }


        private IQueryable<Monitor> AddNameFilterAsync(IQueryable<Monitor> monitors, DeviceFilter filter)
        {
            if (!string.IsNullOrEmpty(filter?.Name))
            {
                monitors = monitors.Where(x => x.Name.Contains(filter.Name));
            }
            return monitors;
        }

        private IQueryable<Monitor> AddTypeFilterAsync(IQueryable<Monitor> monitors, DeviceFilter filter)
        {
            if (filter?.Type != null && filter?.Type.Count() > 0)
            {
                monitors = monitors.Where(x => filter.Type.Contains(x.Type));
            }
            return monitors;
        }

        private IQueryable<Monitor> AddMinPriceFilter(IQueryable<Monitor> monitors, DeviceFilter filter)
        {
            if (filter?.MinPrice != null)
            {
                monitors = monitors.Where(x => x.Price >= filter.MinPrice);
            }
            return monitors;
        }

        private IQueryable<Monitor> AddMaxPriceFilter(IQueryable<Monitor> monitors, DeviceFilter filter)
        {
            if (filter?.MaxPrice != null)
            {
                monitors = monitors.Where(x => x.Price <= filter.MaxPrice);
            }
            return monitors;
        }

        private IQueryable<Monitor> AddLocationFilter(IQueryable<Monitor> monitors, DeviceFilter filter)
        {
            if (filter?.LocationIds != null && filter?.LocationIds.Count() > 0)
            {
                monitors = monitors.Where(x => x.Storage != null && x.Storage.Location != null).Where(x => filter.LocationIds.Contains(x.Storage.Location.Id));
            }
            return monitors;
        }

        private IQueryable<Monitor> AddDestinationFilter(IQueryable<Monitor> monitors, DeviceFilter filter)
        {
            if (filter?.DestinationIds != null && filter?.DestinationIds.Count() > 0)
            {
                monitors = monitors.Where(x => x.Destination != null).Where(x => filter.DestinationIds.Contains(x.Destination.Id));
            }
            return monitors;
        }

        private IQueryable<Monitor> AddInterestFilter(IQueryable<Monitor> monitors, DeviceFilter filter)
        {
            if (filter?.InterestIds != null && filter?.InterestIds.Count() > 0)
            {
                monitors = monitors.Where(x => x.Interest != null).Where(x => filter.InterestIds.Contains(x.Interest.Id));
            }
            return monitors;
        }

        private IQueryable<Monitor> AddInterfacePortsFilter(IQueryable<Monitor> monitors, DeviceFilter filter)
        {
            if (filter?.InterfacePorts != null && filter?.InterfacePorts.Count() > 0)
            {
                var filtered = monitors;
                foreach (var interfacePortsFilter in filter.InterfacePorts)
                {
                    filtered = filtered.Where(x => x.InterfacePorts.Contains(interfacePortsFilter));
                }
                monitors = filtered;
            }
            return monitors;
        }

        private IQueryable<Monitor> AddScreenResolutionFilter(IQueryable<Monitor> monitors, DeviceFilter filter)
        {
            Console.WriteLine("Ilosc elementow screenResolution: " + filter?.ScreenResolution.Count());
            if (filter?.ScreenResolution != null && filter?.ScreenResolution.Count() > 0)
            {
                monitors = monitors.Where(x => x.ScreenResolution != null).Where(x => filter.ScreenResolution.Contains(x.ScreenResolution));
            }
            return monitors;
        }

        private IQueryable<Monitor> AddTouchScreenFilter(IQueryable<Monitor> monitors, DeviceFilter filter)
        {
            if (filter?.HasTouchScreen != null)
            {
                monitors = monitors.Where(x => x.HasTouchScreen == filter.HasTouchScreen);
            }
            return monitors;
        }

        private IQueryable<Monitor> AddSpeakersFilter(IQueryable<Monitor> monitors, DeviceFilter filter)
        {
            if (filter?.HasSpeakers != null)
            {
                monitors = monitors.Where(x => x.HasSpeakers == filter.HasSpeakers);
            }
            return monitors;
        }

        private IQueryable<Monitor> AddContrastFilter(IQueryable<Monitor> monitors, DeviceFilter filter)
        {
            if (filter?.Contrast != null && filter?.Contrast.Count() > 0)
            {
                monitors = monitors.Where(x => filter.Contrast.Contains(x.Contrast));
            }
            return monitors;
        }

        private IQueryable<Monitor> AddRefreshingFilter(IQueryable<Monitor> monitors, DeviceFilter filter)
        {
            if (filter?.Refreshing != null && filter?.Refreshing.Count() > 0)
            {
                monitors = monitors.Where(x => x.Refreshing != null).Where(x => filter.Refreshing.Contains(x.Refreshing.Value));
            }
            return monitors;
        }

        private IQueryable<Monitor> AddMatrixFilter(IQueryable<Monitor> monitors, DeviceFilter filter)
        {
            if (filter?.Matrix != null && filter?.Matrix.Count() > 0)
            {
                monitors = monitors.Where(x => filter.Matrix.Contains(x.Matrix));
            }
            return monitors;
        }

        private IQueryable<Monitor> AddDiagonalFilter(IQueryable<Monitor> monitors, DeviceFilter filter){
            if(filter?.Diagonal != null && filter?.Diagonal.Count() > 0){
                monitors = monitors.Where(x => filter.Diagonal.Contains(x.Diagonal));
            }
            return monitors;
        }

        private IQueryable<Monitor> AddExtensionCardsFilter(IQueryable<Monitor> monitors, DeviceFilter filter)
        {
            if (filter?.ExtensionsCards != null && filter?.ExtensionsCards.Count() > 0)
            {
                monitors = monitors.Where(x => false);
            }
            return monitors;
        }
    }
}
