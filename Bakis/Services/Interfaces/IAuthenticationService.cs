using Bakis.Infrastructure.Database.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Services.Interfaces
{
    public interface IAuthenticationService
    {
        Task<User> Authenticate(string email, string password);
        Task<List<IdentityRole>> GetAllRoles();
    }
}
