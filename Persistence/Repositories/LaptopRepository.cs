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
    public class LaptopRepository : BaseRepository, ILaptopRepository
    {
        public LaptopRepository(DataContext context) : base(context) { }

        public async Task<IEnumerable<Laptop>> ListAsync()
        {
            return await _context.Laptops.Include(p => p.Destination).Include(p => p.Interest).Include(p => p.Storage.Location).ToListAsync();
        }

        public async Task AddAsync(Laptop laptop)
        {
            laptop.Created = DateTime.Now;
            await _context.Laptops.AddAsync(laptop);
        }

        public async Task<Laptop> FindByIdAsync(int id)
        {
            return await _context.Laptops.FindAsync(id);
        }

        public void Update(Laptop laptop)
        {
            _context.Laptops.Update(laptop);
        }

        public void Remove(Laptop laptop)
        {
            _context.Laptops.Remove(laptop);
        }

        public async Task<IEnumerable<Laptop>> ListWithFiltersAsync(DeviceFilter filter)
        {
            IQueryable<Laptop> laptopList = _context.Laptops;

            laptopList = AddNameFilterAsync(laptopList, filter);
            laptopList = AddTypeFilterAsync(laptopList, filter);
            laptopList = AddMinPriceFilter(laptopList, filter);
            laptopList = AddMaxPriceFilter(laptopList, filter);
            laptopList = AddLocationFilter(laptopList, filter);
            laptopList = AddDestinationFilter(laptopList, filter);
            laptopList = AddInterestFilter(laptopList, filter);
            laptopList = AddInterfacePortsFilter(laptopList, filter);
            laptopList = AddScreenResolutionFilter(laptopList, filter);
            laptopList = AddTouchScreenFilter(laptopList, filter);
            laptopList = AddSpeakersFilter(laptopList, filter);
            laptopList = AddContrastFilter(laptopList, filter);
            laptopList = AddRefreshingFilter(laptopList, filter);
            laptopList = AddMatrixFilter(laptopList, filter);
            laptopList = AddDiagonalFilter(laptopList, filter);
            laptopList = AddExtensionCardsFilter(laptopList, filter);

            return await laptopList.Include(p => p.Destination).Include(p => p.Interest).Include(p => p.Storage.Location).ToListAsync();
        }

        private IQueryable<Laptop> AddNameFilterAsync(IQueryable<Laptop> laptops, DeviceFilter filter)
        {
            if (!string.IsNullOrEmpty(filter?.Name))
            {
                laptops = laptops.Where(x => x.Name.Contains(filter.Name));
            }
            return laptops;
        }

        private IQueryable<Laptop> AddTypeFilterAsync(IQueryable<Laptop> laptops, DeviceFilter filter)
        {
            if (filter?.Type != null && filter?.Type.Count() > 0)
            {
                laptops = laptops.Where(x => filter.Type.Contains(x.Type));
            }
            return laptops;
        }

        private IQueryable<Laptop> AddMinPriceFilter(IQueryable<Laptop> laptops, DeviceFilter filter)
        {
            if (filter?.MinPrice != null)
            {
                laptops = laptops.Where(x => x.Price >= filter.MinPrice);
            }
            return laptops;
        }

        private IQueryable<Laptop> AddMaxPriceFilter(IQueryable<Laptop> laptops, DeviceFilter filter)
        {
            if (filter?.MaxPrice != null)
            {
                laptops = laptops.Where(x => x.Price <= filter.MaxPrice);
            }
            return laptops;
        }

        private IQueryable<Laptop> AddLocationFilter(IQueryable<Laptop> laptops, DeviceFilter filter)
        {
            if (filter?.LocationIds != null && filter?.LocationIds.Count() > 0)
            {
                laptops = laptops.Where(x => x.Storage != null && x.Storage.Location != null).Where(x => filter.LocationIds.Contains(x.Storage.Location.Id));
            }
            return laptops;
        }

        private IQueryable<Laptop> AddDestinationFilter(IQueryable<Laptop> laptops, DeviceFilter filter)
        {
            if (filter?.DestinationIds != null && filter?.DestinationIds.Count() > 0)
            {
                laptops = laptops.Where(x => x.Destination != null).Where(x => filter.DestinationIds.Contains(x.Destination.Id));
            }
            return laptops;
        }

        private IQueryable<Laptop> AddInterestFilter(IQueryable<Laptop> laptops, DeviceFilter filter)
        {
            if (filter?.InterestIds != null && filter?.InterestIds.Count() > 0)
            {
                laptops = laptops.Where(x => x.Interest != null).Where(x => filter.InterestIds.Contains(x.Interest.Id));
            }
            return laptops;
        }

        private IQueryable<Laptop> AddInterfacePortsFilter(IQueryable<Laptop> laptops, DeviceFilter filter)
        {
            if (filter?.InterfacePorts != null && filter?.InterfacePorts.Count() > 0)
            {
                var filtered = laptops;
                foreach (var interfacePortsFilter in filter.InterfacePorts)
                {
                    filtered = filtered.Where(x => x.InterfacePorts.Contains(interfacePortsFilter));
                }
                laptops = filtered;
            }
            return laptops;
        }

        private IQueryable<Laptop> AddScreenResolutionFilter(IQueryable<Laptop> laptops, DeviceFilter filter)
        {
            if (filter?.ScreenResolution != null && filter?.ScreenResolution.Count() > 0)
            {
                laptops = laptops.Where(x => x.ScreenResolution != null).Where(x => filter.ScreenResolution.Contains(x.ScreenResolution));
            }
            return laptops;
        }

        private IQueryable<Laptop> AddTouchScreenFilter(IQueryable<Laptop> laptops, DeviceFilter filter)
        {
            if (filter?.HasTouchScreen != null)
            {
                laptops = laptops.Where(x => x.HasTouchScreen == filter.HasTouchScreen);
            }
            return laptops;
        }

        private IQueryable<Laptop> AddSpeakersFilter(IQueryable<Laptop> laptops, DeviceFilter filter)
        {
            if (filter?.HasSpeakers != null)
            {
                laptops = laptops.Where(x => false);
            }
            return laptops;
        }

        private IQueryable<Laptop> AddContrastFilter(IQueryable<Laptop> laptops, DeviceFilter filter)
        {
            if (filter?.Contrast != null && filter?.Contrast.Count() > 0)
            {
                laptops = laptops.Where(x => false);
            }
            return laptops;
        }

        private IQueryable<Laptop> AddRefreshingFilter(IQueryable<Laptop> laptops, DeviceFilter filter)
        {
            if (filter?.Refreshing != null && filter?.Refreshing.Count() > 0)
            {
                laptops = laptops.Where(x => false);
            }
            return laptops;
        }

        private IQueryable<Laptop> AddMatrixFilter(IQueryable<Laptop> laptops, DeviceFilter filter)
        {
            if (filter?.Matrix != null && filter?.Matrix.Count() > 0)
            {
                laptops = laptops.Where(x => false);
            }
            return laptops;
        }

        private IQueryable<Laptop> AddDiagonalFilter(IQueryable<Laptop> laptops, DeviceFilter filter){
            if(filter?.Diagonal != null && filter?.Diagonal.Count() > 0){
                laptops = laptops.Where(x => false);
            }
            return laptops;
        }

        private IQueryable<Laptop> AddExtensionCardsFilter(IQueryable<Laptop> laptops, DeviceFilter filter)
        {
            if (filter?.ExtensionsCards != null && filter?.ExtensionsCards.Count() > 0)
            {
                laptops = laptops.Where(x => false);
            }
            return laptops;
        }
    }
}
