using Bakis.Dtos.Consumers;
using Bakis.Dtos.Users;
using Bakis.Infrastructure.Database.Models;
using Bakis.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;

        public UserService(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IEmailService emailService, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _emailService = emailService;
            _configuration = configuration;
        }
        public async Task<User> Create(Consumer newConsumer, NewConsumerDto newConsumerDto)
        {
            var newUser = new User
            {
                Consumer = newConsumer,
                Email = newConsumer.Email,
                UserName = newConsumer.Email
            };

            var result = await _userManager.CreateAsync(newUser, newConsumerDto.Password);
            if (result.Succeeded)
            {
                IdentityRole role = await _roleManager.FindByNameAsync(newConsumerDto.Role);
                if (role == null)
                {
                    await _roleManager.CreateAsync(new IdentityRole(newConsumerDto.Role));
                }
                await _userManager.AddToRoleAsync(newUser, newConsumerDto.Role);

                var code = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);

                var callbackURL = $"{_configuration["AppSettings:RootUrl"]}/ConfirmEmail?userEmail={newUser.Email}&token={code}";
                await _emailService.SendEmailAsync(newUser.Email,
               "Confirm your account / Patvirtinkite savo el.paštą",
               "Please confirm your account by clicking this link / Patvirtinkite savo el.paštą paspausdami šią nuorodą: <a href=\""
                                               + callbackURL + "\">Confirm</a>");
                return newUser;
            }

            return null;
        }

        public async Task Update(int id, UpdateConsumerDto updateConsumerDto)
        {
            var userToUpdate = await _userManager.Users.FirstOrDefaultAsync(x => x.ConsumerId == id);
            if (userToUpdate == null)
            {
                throw new InvalidOperationException();
            }
            var currentRole = await _userManager.GetRolesAsync(userToUpdate); // Roles that the user has currently
            if (!await _userManager.IsInRoleAsync(userToUpdate, updateConsumerDto.Role))
            {
                await _userManager.AddToRoleAsync(userToUpdate, updateConsumerDto.Role);
                await _userManager.RemoveFromRolesAsync(userToUpdate, currentRole);
            }
        }

        public async Task ChangePassword(int id, UpdatePasswordDto updatePasswordDto)
        {

            var userToUpdate = await _userManager.Users.FirstOrDefaultAsync(x => x.ConsumerId == id);
            if (userToUpdate == null)
            {
                throw new InvalidOperationException();
            }
            var result = await _userManager.ChangePasswordAsync(userToUpdate, updatePasswordDto.CurrentPassword, updatePasswordDto.NewPassword);
            if (!result.Succeeded)
            {
                throw new InvalidOperationException();
            }
        }

        public async Task<Consumer> GetCurrentUser(string email)
        {
            var currentUser = await _userManager.Users.Include(x => x.Consumer).FirstOrDefaultAsync(x => x.Email == email);
            if (currentUser == null)
            {
                throw new InvalidOperationException();
            }
            return currentUser.Consumer;
        }

        public async Task<string> GetUserRole(int id)
        {
            var user = await _userManager.Users.Where(x => x.ConsumerId == id).FirstOrDefaultAsync();

            var userRoles = await _userManager.GetRolesAsync(user);
            var firstUserRole = userRoles.FirstOrDefault();

            return firstUserRole;
        }

        public async Task ConfirmEmail(string email, string token)
        {
            var userToUpdate = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == email);
            if (userToUpdate == null)
            {
                throw new InvalidOperationException();
            }
            token = token.Replace(" ", "+");
            var result = await _userManager.ConfirmEmailAsync(userToUpdate, token);
            if (!result.Succeeded)
            {
                throw new InvalidOperationException();
            }
        }

        public async Task ForgotPassword(string email)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == email);
            if (user == null)
            {
                throw new InvalidOperationException();
            }

            var code = await _userManager.GeneratePasswordResetTokenAsync(user);
            var callbackURL = $"{_configuration["AppSettings:RootUrl"]}/ResetPassword?userEmail={user.Email}&token={code}";
            await _emailService.SendEmailAsync(user.Email,
           "Reset your password / Slaptažodžio atstatymas",
           "Click this link to reset your password / Spauskite nuorodą norėdami atstatyti savo slaptažodį: <a href=\""
                                           + callbackURL + "\">Confirm</a>");
        }

        public async Task ResetPassword(string email, string password, string token)
        {
            var userToUpdate = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == email);
            if (userToUpdate == null)
            {
                throw new InvalidOperationException();
            }
            token = token.Replace(" ", "+");
            var result = await _userManager.ResetPasswordAsync(userToUpdate, token, password);
            if (!result.Succeeded)
            {
                throw new InvalidOperationException();
            }
        }
    }
}
