using Application.Resources;
using AutoMapper;
using Domain.Models;

namespace API.Mapping
{
    public class ResourceToModelProfile : Profile
    {
        public ResourceToModelProfile()
        {
            CreateMap<SaveLaptopResource, Laptop>();
            CreateMap<SaveMonitorResource, Monitor>();
            CreateMap<SaveStorageResource, Storage>();
            CreateMap<SaveLocationResource, Location>();
            CreateMap<SavePCResource, PC>();
            CreateMap<SaveOtherDeviceResource, OtherDevice>();
            CreateMap<DeviceFilterResource, DeviceFilter>();
            CreateMap<SaveFilterResource, Filter>();
            CreateMap<UserResource, User>();
            CreateMap<SaveUserResource, User>();
            CreateMap<SavePurchaseResource, Purchase>();
            CreateMap<SavePurchaseItemsResource, PurchaseItem>();
            CreateMap<SaveUsersCompanyDetailsResource, UsersCompanyDetails>();
            CreateMap<StorageResource, Storage>();
            CreateMap<DestinationResource, Destination>();
            CreateMap<InterestResource, Interest>();
            CreateMap<LocationResource, Location>();
            CreateMap<UsersCompanyDetailsResource, UsersCompanyDetails>();
            CreateMap<ReturnedUserResource, ReturnedUser>();
        }
    }
}