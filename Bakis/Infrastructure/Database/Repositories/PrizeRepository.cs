using Bakis.Infrastructure.Database.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Repositories
{
    public class PrizeRepository : IPrizeRepository
    {
        protected readonly AppDbContext Context;
        public PrizeRepository(AppDbContext context)
        {
            Context = context;
        }

        public async Task<ICollection<Prize>> GetAll()
        {
            var prizes = await Context.Prizes.ToArrayAsync();

            return prizes;
        }

        public async Task<Prize> GetById(int id)
        {
            var prize = await Context.Prizes.FindAsync(id);

            return prize;
        }

        public async Task<int> Create(Prize newPrize)
        {
            Context.Prizes.Add(newPrize);
            await Context.SaveChangesAsync();

            return newPrize.Id;
        }

        public async Task<bool> Update(Prize prize)
        {
            Context.Prizes.Attach(prize);
            var changes = await Context.SaveChangesAsync();

            return changes > 0;
        }

        public async Task<bool> Delete(Prize prize)
        {
            Context.Prizes.Remove(prize);
            var changes = await Context.SaveChangesAsync();

            return changes > 0;
        }
    }
}
