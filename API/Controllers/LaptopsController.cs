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
    public class LaptopsController : Controller
    {
        private readonly ILaptopService _laptopService;
        private readonly IMapper _mapper;
        public LaptopsController(ILaptopService laptopService, IMapper mapper)
        {
            _laptopService = laptopService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] SaveLaptopResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var laptop = _mapper.Map<SaveLaptopResource, Laptop>(resource);
            var result = await _laptopService.SaveAsync(laptop);

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] SaveLaptopResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var laptop = _mapper.Map<SaveLaptopResource, Laptop>(resource);
            var result = await _laptopService.UpdateAsync(id, laptop);

            if (!result.Success)
                return BadRequest(result.Message);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _laptopService.DeleteAsync(id);

            if (!result.Success)
                return BadRequest(result.Message);

            return NoContent();
        }
    }
}