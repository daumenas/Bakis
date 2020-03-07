using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bakis.Infrastructure.Database.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Bakis.Infrastructure.Database
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public DbSet<Consumer> Consumers { get; set; }
    }
}
