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
    [Authorize]
    [Route("/api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private readonly IUsersCompanyDetailsService _companyDetailsService;
        private readonly IMapper _mapper;

        public UserController(IUserService userService, IMapper mapper, IUsersCompanyDetailsService companyDetailsService)
        {
            _mapper = mapper;
            _userService = userService;
            _companyDetailsService = companyDetailsService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] UserResource userResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var appUser = _mapper.Map<UserResource, User>(userResource);
            var result = await _userService.Login(appUser);

            if (!result.Success)
                return Unauthorized(result.Message);

            var resource = _mapper.Map<ReturnedUser, ReturnedUserResource>(result.Type);

            return Ok(resource);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register([FromBody] SaveUserResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var user = _mapper.Map<SaveUserResource, User>(resource);

            var result = await _userService.Register(user, "User");

            if (!result.Success)
                return Unauthorized(result.Message);

            return Ok(result.Type);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("admin/register")]
        public async Task<ActionResult<AppUser>> AdminRegister([FromBody] SaveUserResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var user = _mapper.Map<SaveUserResource, User>(resource);


            var result = await _userService.Register(user, "Admin");

            if (!result.Success)
                return Unauthorized(result.Message);

            return Ok(result.Type);
        }

        [HttpPut("{id}/companydetails")]
        public async Task<ActionResult> UpdateCompanyDetails(string id, [FromBody] SaveUsersCompanyDetailsResource resource)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var companyDetails = _mapper.Map<SaveUsersCompanyDetailsResource, UsersCompanyDetails>(resource);
            var result = await _userService.UpdateCompanyDetails(id, companyDetails);

            if (!result.Success)
                return Unauthorized(result.Message);

            return NoContent();
        }


        [HttpGet]
        public async Task<ActionResult> CurrentUser()
        {
            var result = await _userService.CurrentUser();

            if (!result.Success)
                return Unauthorized(result.Message);

            var resource = _mapper.Map<ReturnedUser, ReturnedUserResource>(result.Type);

            return Ok(resource);
        }
    }
}