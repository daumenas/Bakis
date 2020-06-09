using Bakis.Dtos.Consumers;
using Bakis.Dtos.Users;
using Bakis.Infrastructure.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Services.Interfaces
{
    public interface IUserService
    {
        Task<User> Create(Consumer newConsumer, NewConsumerDto newConsumerDto);

        Task Update(int id, UpdateConsumerDto updateConsumerDto);

        Task ChangePassword(int id, UpdatePasswordDto updatePasswordDto);

        Task<Consumer> GetCurrentUser(string email);
        Task<string> GetUserRole(int id);
        Task ConfirmEmail(string email, string token);
        Task ForgotPassword(string email);
        Task ResetPassword(string email, string password, string token);
    }
}
