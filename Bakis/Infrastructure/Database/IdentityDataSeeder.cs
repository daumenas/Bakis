using Bakis.Infrastructure.Database.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database
{
    public static class IdentityDataSeeder
    {
        public static void SeedData(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            SeedRoles(roleManager, configuration);
            //SeedUser(userManager, configuration);
        }

        private static void SeedRoles(RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            if (!roleManager.RoleExistsAsync(configuration.GetValue<string>("AdminData:RoleName")).Result)
            {
                var role = new IdentityRole { Name = configuration.GetValue<string>("AdminData:RoleName") };
                roleManager.CreateAsync(role).Wait();
            }

            if (!roleManager.RoleExistsAsync("EventOrganiser").Result)
            {
                var role = new IdentityRole { Name = "EventOrganiser" };
                roleManager.CreateAsync(role).Wait();
            }

            if (!roleManager.RoleExistsAsync("Consumer").Result)
            {
                var role = new IdentityRole { Name = "Consumer" };
                roleManager.CreateAsync(role).Wait();
            }
        }

        //private static void SeedUser(UserManager<User> userManager, IConfiguration configuration)
        //{
        //    if (userManager.GetUsersInRoleAsync("Admin").Result.Count <= 0)
        //    {
        //        var user = new User
        //        {
        //            UserName = configuration.GetValue<string>("AdminData:AdminEmail"),
        //            Email = configuration.GetValue<string>("AdminData:AdminEmail"),
        //            ConsumerId = 1
        //        };
        //        var result = userManager.CreateAsync(user, configuration.GetValue<string>("AdminData:AdminPassword")).Result;

        //        if (result.Succeeded)
        //        {
        //            userManager.AddToRoleAsync(user, configuration.GetValue<string>("AdminData:RoleName")).Wait();
        //        }
        //    }
        //}
    }
}
