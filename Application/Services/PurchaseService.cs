using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Responses;
using Application.Services.Interfaces;
using Domain.Models;
using Persistence.Repositories.Interfaces;

namespace Application.Services
{
    public class PurchaseService : IPurchaseService
    {
        private readonly IPurchaseRepository _purchaseRepository;
        private readonly IUserService _userService;
        private readonly IDeviceService _deviceService;
        private readonly IUnitOfWork _unitOfWork;

        public PurchaseService(IPurchaseRepository purchaseRepository, IUserService userService, IDeviceService deviceService, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _deviceService = deviceService;
            _userService = userService;
            _purchaseRepository = purchaseRepository;
        }

        public async Task<Response<List<Purchase>>> ListAsync(){
            var existingUser = await _userService.CurrentAppUser();
            if(existingUser == null){
                return new Response<List<Purchase>>(string.Format("Users data are not valid"));
            }else {
                var purchases = await _purchaseRepository.ListAsync();
                return new Response<List<Purchase>>(purchases);
            }
        }

        public async Task<Response<Purchase>> SaveAsync(Purchase purchase)
        {
            bool purchaseAvailable = true;
            var existingUser = await _userService.CurrentAppUser();
            if (existingUser == null)
            {
                return new Response<Purchase>(string.Format("Users data are not valid"));
            }
            else
            {
                purchase.ClientId = existingUser.Id;
                purchase.Created = DateTime.Now;
                foreach (var item in purchase.Items)
                {
                    Console.WriteLine(string.Format("{0}", item.DeviceKey));
                    var device = await _deviceService.FindDeviceAsync(item.DeviceKey, item.Type);
                    if (device == null || device.Quantity - item.Quantity < 0)
                    {
                        purchaseAvailable = false;
                        break;
                    }
                }

                if (purchaseAvailable)
                {
                    foreach (var item in purchase.Items)
                    {
                        await _deviceService.ModifyQuantity(item.DeviceKey, item.Type, item.Quantity);
                    }

                    await _purchaseRepository.AddAsync(purchase);
                    await _unitOfWork.CommitTransactionAsync();

                    return new Response<Purchase>(purchase);
                }
                else
                {
                    return new Response<Purchase>(string.Format("Quantities out of stock or products not available"));
                }
            }
        }
    }
}