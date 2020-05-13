using Bakis.Infrastructure.Database.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Repositories
{
    public class ConsumerSightRepository : IConsumerSightRepository
    {
        protected readonly AppDbContext Context;
        public ConsumerSightRepository(AppDbContext context)
        {
            Context = context;
        }

        public async Task<ICollection<ConsumerSight>> GetAll()
        {
            var consumerSight = await Context.ConsumerSight.ToArrayAsync();

            return consumerSight;
        }

        public async Task<ConsumerSight> GetById(int id)
        {
            var consumerSight = await Context.ConsumerSight.FindAsync(id);

            return consumerSight;
        }

        public async Task<int> Create(ConsumerSight newConsumerSight)
        {
            Context.ConsumerSight.Add(newConsumerSight);
            await Context.SaveChangesAsync();

            return newConsumerSight.Id;
        }

        public async Task<bool> Update(ConsumerSight consumerSight)
        {
            Context.ConsumerSight.Attach(consumerSight);
            var changes = await Context.SaveChangesAsync();

            return changes > 0;
        }

        public async Task<bool> Delete(ConsumerSight consumerSight)
        {
            Context.ConsumerSight.Remove(consumerSight);
            var changes = await Context.SaveChangesAsync();

            return changes > 0;
        }
    }
}
