using System.Threading.Tasks;
using Application.Services.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("/api/[controller]")]
    public class PurchaseController : Controller
    {
        private readonly IPurchaseService _purchaseService;
        private readonly IMapper _mapper;

        public PurchaseController(IPurchaseService purchaseService, IMapper mapper)
        {
            _mapper = mapper;
            _purchaseService = purchaseService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllAsync()
        {
            var purchases = await _purchaseService.ListAsync();
            if (!purchases.Success)
                return BadRequest(purchases.Message);

            return Ok(purchases.Type);
        }

    }
}