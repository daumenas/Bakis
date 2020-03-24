using Bakis.Infrastructure.Database.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Repositories
{
    public class ConsumerRepository : IConsumerRepository
    {
        protected readonly AppDbContext Context;
        private readonly UserManager<User> _userManager;
        public ConsumerRepository(AppDbContext context, UserManager<User> userManager)
        {
            Context = context;
            _userManager = userManager;
        }

        public async Task<ICollection<Consumer>> GetAll()
        {
            var consumers = await Context.Consumers.ToArrayAsync();

            return consumers;
        }

        public async Task<Consumer> GetById(int id)
        {
            var consumer = await Context.Consumers.FindAsync(id);

            return consumer;
        }

        public async Task<int> Create(Consumer newConsumer)
        {
            Context.Consumers.Add(newConsumer);
            await Context.SaveChangesAsync();

            return newConsumer.Id;
        }

        public async Task<bool> Update(Consumer consumer)
        {
            Context.Consumers.Attach(consumer);
            var changes = await Context.SaveChangesAsync();

            return changes > 0;
        }

        public async Task<bool> Delete(Consumer consumer)
        {
            Context.Consumers.Remove(consumer);
            var changes = await Context.SaveChangesAsync();

            return changes > 0;
        }

        public async Task<Consumer> FindByEmail(string email)
        {
           var consumer = await Context.Consumers.SingleOrDefaultAsync(cons => cons.Email == email);

            return consumer;
        }
    }
}