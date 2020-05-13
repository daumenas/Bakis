using Bakis.Infrastructure.Database.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Repositories
{
    public class ConsumerSightRepository : RepositoryBase<ConsumerSight>
    {
        protected override DbSet<ConsumerSight> ItemSet { get; }

        public ConsumerSightRepository(AppDbContext context) : base(context)
        {
            ItemSet = context.ConsumerSight;
        }
    }
}
