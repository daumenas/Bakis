using Bakis.Dtos.Consumers;
using Bakis.Dtos.Users;
using Bakis.Infrastructure.Database.Models;
using Bakis.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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

        public UserService(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
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
                IdentityRole role = await _roleManager.FindByIdAsync(newConsumerDto.Role);
                if (role == null)
                {
                    await _roleManager.CreateAsync(new IdentityRole(newConsumerDto.Role));
                }
                await _userManager.AddToRoleAsync(newUser, newConsumerDto.Role);
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
    }
}
