using Application.Extensions;
using Application.Resources;
using AutoMapper;
using Domain.Models;

namespace API.Mapping
{
    public class ModelToResourceProfile : Profile
    {
        public ModelToResourceProfile()
        {
            CreateMap<Storage, StorageResource>();
            CreateMap<Location, LocationResource>();
            CreateMap<OtherDevice, OtherDeviceResource>();
            CreateMap<PC, PCResource>();
            CreateMap<Laptop, LaptopResource>();
            CreateMap<Monitor, MonitorResource>();
            CreateMap<Laptop, DeviceResource>();
            CreateMap<Monitor, DeviceResource>();
            CreateMap<PC, DeviceResource>();
            CreateMap<OtherDevice, DeviceResource>();
            CreateMap<Filter, FilterResource>();
            CreateMap<Destination, DestinationResource>();
            CreateMap<Interest, InterestResource>();
            CreateMap<Laptop, DeviceResource>();
            CreateMap<Monitor, DeviceResource>();
            CreateMap<PC, DeviceResource>();
            CreateMap<ReturnedUser, ReturnedUserResource>();
            CreateMap<UsersCompanyDetails, UsersCompanyDetailsResource>();
        }
    }
}