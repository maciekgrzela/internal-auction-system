using System.Threading.Tasks;
using Application.Extensions;
using Application.Resources;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("/api/[controller]")]
    public class CartController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IPurchaseService _purchaseService;

        public CartController(IMapper mapper, IPurchaseService purchaseService)
        {
            _purchaseService = purchaseService;
            _mapper = mapper;
        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> FinalizeTransactionAsync([FromBody] SavePurchaseResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var purchase = _mapper.Map<SavePurchaseResource, Purchase>(resource);
            var result = await _purchaseService.SaveAsync(purchase);

            if (!result.Success)
                return BadRequest(result.Message);

            return NoContent();
        }
    }
}