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
    public class MonitorsController : Controller
    {
        private readonly IMonitorService _monitorService;
        private readonly IMapper _mapper;
        public MonitorsController(IMonitorService monitorService, IMapper mapper)
        {
            _monitorService = monitorService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] SaveMonitorResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var monitor = _mapper.Map<SaveMonitorResource, Monitor>(resource);
            var result = await _monitorService.SaveAsync(monitor);

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] SaveMonitorResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var monitor = _mapper.Map<SaveMonitorResource, Monitor>(resource);
            var result = await _monitorService.UpdateAsync(id, monitor);

            if (!result.Success)
                return BadRequest(result.Message);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _monitorService.DeleteAsync(id);

            if (!result.Success)
                return BadRequest(result.Message);

            return NoContent();
        }
    }
}