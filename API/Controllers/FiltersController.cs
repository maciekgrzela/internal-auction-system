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
    public class FiltersController : Controller
    {
        private readonly IFilterService _filterService;
        private readonly IMapper _mapper;
        public FiltersController(IFilterService filterService, IMapper mapper)
        {
            _filterService = filterService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var filters = await _filterService.ListAsync();
            return Ok(filters);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            var result = await _filterService.GetFilterAsync(id);

            if (!result.Success)
                return BadRequest(result.Message);

            var filterResource = _mapper.Map<Filter, FilterResource>(result.Type);

            return Ok(filterResource);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] SaveFilterResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var filter = _mapper.Map<SaveFilterResource, Filter>(resource);
            var result = await _filterService.SaveAsync(filter);

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] SaveFilterResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var filter = _mapper.Map<SaveFilterResource, Filter>(resource);
            var result = await _filterService.UpdateAsync(id, filter);

            if (!result.Success)
                return BadRequest(result.Message);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _filterService.DeleteAsync(id);

            if (!result.Success)
                return BadRequest(result.Message);

            return NoContent();
        }
    }
}