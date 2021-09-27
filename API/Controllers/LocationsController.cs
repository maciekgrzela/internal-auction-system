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
    [Route("api/[controller]")]
    [ApiController]
    public class LocationsController : Controller
    {
        private readonly ILocationService _locationService;
        private readonly IMapper _mapper;
        public LocationsController(ILocationService locationService, IMapper mapper)
        {
            _locationService = locationService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var locations = await _locationService.ListAsync();
            var resources = _mapper.Map<IEnumerable<Location>, IEnumerable<LocationResource>>(locations);
            return Ok(resources);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            var result = await _locationService.GetLocationAsync(id);

            if (!result.Success)
                return BadRequest(result.Message);

            var locationResource = _mapper.Map<Location, LocationResource>(result.Type);

            return Ok(locationResource);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] SaveLocationResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var location = _mapper.Map<SaveLocationResource, Location>(resource);
            var result = await _locationService.SaveAsync(location);

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] SaveLocationResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var location = _mapper.Map<SaveLocationResource, Location>(resource);
            var result = await _locationService.UpdateAsync(id, location);

            if (!result.Success)
                return BadRequest(result.Message);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _locationService.DeleteAsync(id);

            if (!result.Success)
                return BadRequest(result.Message);

            return NoContent();
        }
    }
}
