using System;
using Bakis.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Bakis.Infrastructure.Database.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Options;
using Bakis.Configurations;
using Microsoft.AspNetCore.WebUtilities;
using System.Text.Encodings.Web;

namespace Bakis.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly AppSettings _appSettings;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public AuthenticationService(
            IOptions<AppSettings> appSettings,
            UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _appSettings = appSettings.Value;
        }

        public async Task<User> Authenticate(string email, string password)
        {
            var userToVerify = await _userManager.FindByEmailAsync(email);

            if (userToVerify == null)
            {
                return null;
            }

            if (await _userManager.CheckPasswordAsync(userToVerify, password))
            {
                var user = await _userManager.Users.Include(e => e.Consumer).SingleAsync(x => x.Email == email);
                user.Consumer.Token = await CreateJwt(user);
                return user;
            }

            return null;
        }

        public async Task<User> Register(string email, string password)
        {
            var userToVerify = await _userManager.FindByEmailAsync(email);

            if (userToVerify == null)
            {
                var user = new User { Email = email };
                var result = await _userManager.CreateAsync(user, password);
                if (result.Succeeded)
                {
                    Console.Write("User created a new account with password.");
                }
            }

            return null;
        }

        private async Task<string> CreateJwt(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var roles = await _userManager.GetRolesAsync(user);
            claims.AddRange(roles.Select(role => new Claim("role", role)));
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Secret));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var durationTime = DateTime.Now.AddDays(14);

            var token = new JwtSecurityToken(
                "Issuer",
                "Issuer",
                claims,
                expires: durationTime,
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);

        }
        public async Task<List<IdentityRole>> GetAllRoles()
        {
            return await _roleManager.Roles.ToListAsync();
        }
    }
}
