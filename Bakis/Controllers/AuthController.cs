using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bakis.Dtos;
using Bakis.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Bakis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authenticationService;
        public AuthController(IAuthService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login(AuthenticateDto request)
        {
            if (request.Email != null && request.Password != null)
            {
                var result = await _authenticationService.Authenticate(request.Email, request.Password);

                if (result != null)
                {
                    return Ok(new
                    {
                        result.Consumer.Id,
                        result.Consumer.Token
                    });
                }

                return Unauthorized();
            }
            return BadRequest();
        }

        [HttpGet]
        [Route("roles")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _authenticationService.GetAllRoles();
            return Ok(roles);
        }
    }
}