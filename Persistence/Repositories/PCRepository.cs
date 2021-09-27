using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Contexts;
using Persistence.Repositories.Interfaces;

namespace Persistence.Repositories
{
    public class PCRepository : BaseRepository, IPCRepository
    {
        public PCRepository(DataContext context) : base(context) { }

        public async Task<IEnumerable<PC>> ListAsync()
        {
            return await _context.PCs.Include(p => p.Destination).Include(p => p.Interest).Include(p => p.Storage.Location).ToListAsync();
        }

        public async Task AddAsync(PC pc)
        {
            pc.Created = DateTime.Now;
            await _context.PCs.AddAsync(pc);
        }

        public async Task<PC> FindByIdAsync(int id)
        {
            return await _context.PCs.FindAsync(id);
        }

        public void Update(PC pc)
        {
            _context.PCs.Update(pc);
        }

        public void Remove(PC pc)
        {
            _context.PCs.Remove(pc);
        }

        public async Task<IEnumerable<PC>> ListWithFiltersAsync(DeviceFilter filter)
        {
            IQueryable<PC> pcList = _context.PCs;

            pcList = AddNameFilterAsync(pcList, filter);
            pcList = AddTypeFilterAsync(pcList, filter);
            pcList = AddMinPriceFilter(pcList, filter);
            pcList = AddMaxPriceFilter(pcList, filter);
            pcList = AddLocationFilter(pcList, filter);
            pcList = AddDestinationFilter(pcList, filter);
            pcList = AddInterestFilter(pcList, filter);
            pcList = AddInterfacePortsFilter(pcList, filter);
            pcList = AddScreenResolutionFilter(pcList, filter);
            pcList = AddTouchScreenFilter(pcList, filter);
            pcList = AddSpeakersFilter(pcList, filter);
            pcList = AddDiagonalFilter(pcList, filter);
            pcList = AddContrastFilter(pcList, filter);
            pcList = AddRefreshingFilter(pcList, filter);
            pcList = AddMatrixFilter(pcList, filter);
            pcList = AddExtensionCardsFilter(pcList, filter);

            return await pcList.Include(p => p.Destination).Include(p => p.Interest).Include(p => p.Storage.Location).ToListAsync();
        }


        private IQueryable<PC> AddNameFilterAsync(IQueryable<PC> pcs, DeviceFilter filter)
        {
            if (!string.IsNullOrEmpty(filter?.Name))
            {
                pcs = pcs.Where(x => x.Name.Contains(filter.Name));
            }
            return pcs;
        }

        private IQueryable<PC> AddTypeFilterAsync(IQueryable<PC> pcs, DeviceFilter filter)
        {
            if (filter?.Type != null && filter?.Type.Count() > 0)
            {
                pcs = pcs.Where(x => filter.Type.Contains(x.Type));
            }
            return pcs;
        }

        private IQueryable<PC> AddMinPriceFilter(IQueryable<PC> pcs, DeviceFilter filter)
        {
            if (filter?.MinPrice != null)
            {
                pcs = pcs.Where(x => x.Price >= filter.MinPrice);
            }
            return pcs;
        }

        private IQueryable<PC> AddMaxPriceFilter(IQueryable<PC> pcs, DeviceFilter filter)
        {
            if (filter?.MaxPrice != null)
            {
                pcs = pcs.Where(x => x.Price <= filter.MaxPrice);
            }
            return pcs;
        }

        private IQueryable<PC> AddLocationFilter(IQueryable<PC> pcs, DeviceFilter filter)
        {
            if (filter?.LocationIds != null && filter?.LocationIds.Count() > 0)
            {
                pcs = pcs.Where(x => x.Storage != null && x.Storage.Location != null).Where(x => filter.LocationIds.Contains(x.Storage.Location.Id));
            }
            return pcs;
        }

        private IQueryable<PC> AddDestinationFilter(IQueryable<PC> pcs, DeviceFilter filter)
        {
            if (filter?.DestinationIds != null && filter?.DestinationIds.Count() > 0)
            {
                pcs = pcs.Where(x => x.Destination != null).Where(x => filter.DestinationIds.Contains(x.Destination.Id));
            }
            return pcs;
        }

        private IQueryable<PC> AddInterestFilter(IQueryable<PC> pcs, DeviceFilter filter)
        {
            if (filter?.InterestIds != null && filter?.InterestIds.Count() > 0)
            {
                pcs = pcs.Where(x => x.Interest != null).Where(x => filter.InterestIds.Contains(x.Interest.Id));
            }
            return pcs;
        }

        private IQueryable<PC> AddInterfacePortsFilter(IQueryable<PC> pcs, DeviceFilter filter)
        {
            if (filter?.InterfacePorts != null && filter?.InterfacePorts.Count() > 0)
            {
                var filtered = pcs;
                foreach (var interfacePortsFilter in filter.InterfacePorts)
                {
                    filtered = filtered.Where(x => x.InterfacePorts.Contains(interfacePortsFilter));
                }
                pcs = filtered;
            }
            return pcs;
        }

        private IQueryable<PC> AddScreenResolutionFilter(IQueryable<PC> pcs, DeviceFilter filter)
        {
            if (filter?.ScreenResolution != null && filter?.ScreenResolution.Count() > 0)
            {
                pcs = pcs.Where(x => false);
            }
            return pcs;
        }

        private IQueryable<PC> AddTouchScreenFilter(IQueryable<PC> pcs, DeviceFilter filter)
        {
            if (filter?.HasTouchScreen != null)
            {
                pcs = pcs.Where(x => false);
            }
            return pcs;
        }

        private IQueryable<PC> AddSpeakersFilter(IQueryable<PC> pcs, DeviceFilter filter)
        {
            if (filter?.HasSpeakers != null)
            {
                pcs = pcs.Where(x => false);
            }
            return pcs;
        }

        private IQueryable<PC> AddContrastFilter(IQueryable<PC> pcs, DeviceFilter filter)
        {
            if (filter?.Contrast != null && filter?.Contrast.Count() > 0)
            {
                pcs = pcs.Where(x => false);
            }
            return pcs;
        }

        private IQueryable<PC> AddRefreshingFilter(IQueryable<PC> pcs, DeviceFilter filter)
        {
            if (filter?.Refreshing != null && filter?.Refreshing.Count() > 0)
            {
                pcs = pcs.Where(x => false);
            }
            return pcs;
        }

        private IQueryable<PC> AddMatrixFilter(IQueryable<PC> pcs, DeviceFilter filter)
        {
            if (filter?.Matrix != null && filter?.Matrix.Count() > 0)
            {
                pcs = pcs.Where(x => false);
            }
            return pcs;
        }

        private IQueryable<PC> AddDiagonalFilter(IQueryable<PC> pcs, DeviceFilter filter){
            if(filter?.Diagonal != null && filter?.Diagonal.Count() > 0){
                pcs = pcs.Where(x => false);
            }
            return pcs;
        }

        private IQueryable<PC> AddExtensionCardsFilter(IQueryable<PC> pcs, DeviceFilter filter)
        {
            if (filter?.ExtensionsCards != null && filter?.ExtensionsCards.Count() > 0)
            {
                var filtered = pcs;
                foreach (var extensionsCardsFilter in filter.ExtensionsCards)
                {
                    filtered = filtered.Where(x => x.ExtensionsCards.Contains(extensionsCardsFilter));
                }
                pcs = filtered;
            }
            return pcs;
        }
    }
}