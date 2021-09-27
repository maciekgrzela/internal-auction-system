using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Resources;

namespace Application.Services.Interfaces
{
    public interface IDeviceService
    {
        Task<IEnumerable<DeviceResource>> ListAsync(DeviceFilterResource deviceFilterResource = null);
        Task<DeviceResource> FindDeviceAsync(int id, string type);
        Task ModifyQuantity(int id, string type, int quantity);
    }
}