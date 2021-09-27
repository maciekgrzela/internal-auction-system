using System.Linq;
using System.Threading.Tasks;
using Application.Resources;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("/api/[controller]")]
    public class DevicesController : Controller
    {
        private readonly IDeviceService _deviceService;

        public DevicesController(IDeviceService deviceService)
        {
            _deviceService = deviceService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllAsync([FromQuery] DeviceFilterResource query)
        {
            var devices = await _deviceService.ListAsync(query);
            return Ok(devices);
        }
    }
}