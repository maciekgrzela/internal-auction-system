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
    public class StoragesController : Controller
    {
        private readonly IStorageService _storageService;
        private readonly IMapper _mapper;
        public StoragesController(IStorageService storageService, IMapper mapper)
        {
            _storageService = storageService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var storages = await _storageService.ListAsync();
            var resources = _mapper.Map<IEnumerable<Storage>, IEnumerable<StorageResource>>(storages);
            return Ok(resources);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            var result = await _storageService.GetStorageAsync(id);

            if (!result.Success)
                return BadRequest(result.Message);

            var storageResource = _mapper.Map<Storage, StorageResource>(result.Type);

            return Ok(storageResource);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] SaveStorageResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var storage = _mapper.Map<SaveStorageResource, Storage>(resource);
            var result = await _storageService.SaveAsync(storage);

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] SaveStorageResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var storage = _mapper.Map<SaveStorageResource, Storage>(resource);
            var result = await _storageService.UpdateAsync(id, storage);

            if (!result.Success)
                return BadRequest(result.Message);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _storageService.DeleteAsync(id);

            if (!result.Success)
                return BadRequest(result.Message);

            return NoContent();
        }
    }
}