using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Extensions;
using Application.Resources;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("/api/[controller]")]
    public class OtherDevicesController : Controller
    {
        private readonly IOtherDeviceService _otherDeviceService;
        private readonly IMapper _mapper;
        public OtherDevicesController(IOtherDeviceService otherDeviceService, IMapper mapper)
        {
            _otherDeviceService = otherDeviceService;
            _mapper = mapper;
        }


        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] SaveOtherDeviceResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var other = _mapper.Map<SaveOtherDeviceResource, OtherDevice>(resource);
            var result = await _otherDeviceService.SaveAsync(other);

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] SaveOtherDeviceResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var other = _mapper.Map<SaveOtherDeviceResource, OtherDevice>(resource);
            var result = await _otherDeviceService.UpdateAsync(id, other);

            if (!result.Success)
                return BadRequest(result.Message);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _otherDeviceService.DeleteAsync(id);

            if (!result.Success)
                return BadRequest(result.Message);

            return NoContent();
        }
    }
}