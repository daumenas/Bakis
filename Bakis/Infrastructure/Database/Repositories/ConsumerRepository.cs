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
            var employees = await Context.Consumers.ToArrayAsync();

            return employees;
        }

        public async Task<Consumer> GetById(int id)
        {
            var employee = await Context.Consumers.FindAsync(id);

            return employee;
        }

        public async Task<int> Create(Consumer newConsumer)
        {
            Context.Consumers.Add(newConsumer);
            await Context.SaveChangesAsync();

            return newConsumer.Id;
        }

        public async Task<bool> Update(Consumer employee)
        {
            Context.Consumers.Attach(employee);
            var changes = await Context.SaveChangesAsync();

            return changes > 0;
        }

        public async Task<bool> Delete(Consumer employee)
        {
            Context.Consumers.Remove(employee);
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