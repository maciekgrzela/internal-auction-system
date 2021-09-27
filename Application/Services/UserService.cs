using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Responses;
using Application.Services.Interfaces;
using Domain.Models;
using Microsoft.AspNetCore.Identity;
using Persistence.Repositories.Interfaces;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IJwtGenerator _jwtGenerator;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IUserAccessor _userAccessor;
        private readonly IUsersCompanyDetailsService _usersCompanyDetailsService;
        private readonly IUnitOfWork _unitOfWork;
        public UserService(IUserAccessor userAccessor, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator, RoleManager<IdentityRole> roleManager, IUsersCompanyDetailsService usersCompanyDetailsService, IUnitOfWork unitOfWork)
        {
            _usersCompanyDetailsService = usersCompanyDetailsService;
            _userAccessor = userAccessor;
            _jwtGenerator = jwtGenerator;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _userManager = userManager;
            _unitOfWork = unitOfWork;
        }

        public async Task<Response<ReturnedUser>> Login(User fetchedUser)
        {
            var user = await _userManager.FindByEmailAsync(fetchedUser.Email);
            if (user == null)
            {
                return new Response<ReturnedUser>(string.Format("User with email:{0} not found", fetchedUser.Email));
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, fetchedUser.Password, false);

            if (result.Succeeded)
            {
                var userRole = await _userManager.GetRolesAsync(user);

                UsersCompanyDetails companyDetails = null;

                if (user.UsersCompanyDetailsId != null)
                {
                    companyDetails = await _usersCompanyDetailsService.FindByIdAsync((int)user.UsersCompanyDetailsId);
                }

                var returnedUser = new ReturnedUser
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Role = userRole[0],
                    Token = _jwtGenerator.CreateToken(user, userRole[0]),
                    UsersCompanyDetailsId = user.UsersCompanyDetailsId,
                    UsersCompanyDetails = companyDetails
                };
                await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.Role, userRole[0]));

                return new Response<ReturnedUser>(returnedUser);
            }
            else
            {
                return new Response<ReturnedUser>(string.Format("Authorization data are not valid"));
            }

        }

        public async Task<Response<ReturnedUser>> Register(User fetchedUser, string userRole)
        {
            if (await _userManager.FindByEmailAsync(fetchedUser.Email) != null)
                return new Response<ReturnedUser>(string.Format("Email already exists"));

            var existingRole = await _roleManager.RoleExistsAsync(userRole);
            if (existingRole)
            {
                var user = new AppUser
                {
                    FirstName = fetchedUser.FirstName,
                    LastName = fetchedUser.LastName,
                    Email = fetchedUser.Email,
                    UserName = fetchedUser.Email
                };

                var result = await _userManager.CreateAsync(user, fetchedUser.Password);


                if (result.Succeeded)
                {
                    var returnedUser = new ReturnedUser
                    {
                        Id = user.Id,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Role = userRole,
                        Token = _jwtGenerator.CreateToken(user, userRole),
                    };

                    await _userManager.AddToRoleAsync(user, userRole);
                    await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.Role, userRole));

                    return new Response<ReturnedUser>(returnedUser);
                }
                else
                {
                    return new Response<ReturnedUser>(string.Format("Problem creating user"));
                }

            }
            else
            {
                return new Response<ReturnedUser>(string.Format("There is no {0} role inside system", userRole));
            }
        }

        public async Task<AppUser> FindByIdAsync(string id)
        {
            return await _userManager.FindByIdAsync(id);
        }

        public async Task<Response<ReturnedUser>> CurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(_userAccessor.GetCurrentUsername());
            var userRole = await _userManager.GetRolesAsync(user);

            UsersCompanyDetails companyDetails = null;

            if (user.UsersCompanyDetailsId != null)
            {
                companyDetails = await _usersCompanyDetailsService.FindByIdAsync((int)user.UsersCompanyDetailsId);
            }

            var returnedUser = new ReturnedUser
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = userRole[0],
                Token = _jwtGenerator.CreateToken(user, userRole[0]),
                UsersCompanyDetailsId = user.UsersCompanyDetailsId,
                UsersCompanyDetails = companyDetails
            };

            await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.Role, userRole[0]));

            return new Response<ReturnedUser>(returnedUser);
        }

        public async Task<AppUser> CurrentAppUser()
        {
            var user = await _userManager.FindByEmailAsync(_userAccessor.GetCurrentUsername());
            return user;
        }

        public async Task<Response<AppUser>> UpdateCompanyDetails(string id, UsersCompanyDetails usersCompanyDetails)
        {
            var existingUser = await _userManager.FindByIdAsync(id);

            if (existingUser == null)
                return new Response<AppUser>(string.Format("User with id:{0} not found", id));

            if (existingUser.UsersCompanyDetailsId != null)
            {
                var result = await _usersCompanyDetailsService.UpdateAsync((int)existingUser.UsersCompanyDetailsId, usersCompanyDetails);
                if (!result.Success)
                {
                    return new Response<AppUser>(result.Message);
                }
            }
            else
            {
                existingUser.UsersCompanyDetails = usersCompanyDetails;
                await _userManager.UpdateAsync(existingUser);
            }
            return new Response<AppUser>(existingUser);
        }
    }
}