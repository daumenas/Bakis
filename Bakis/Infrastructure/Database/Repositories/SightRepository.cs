﻿using Bakis.Infrastructure.Database.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Repositories
{
    public class SightRepository : ISightRepository
    {
        protected readonly AppDbContext Context;
        public SightRepository(AppDbContext context)
        {
            Context = context;
        }

        public async Task<ICollection<Sight>> GetAll()
        {
            var sights = await Context.Sights.ToArrayAsync();

            return sights;
        }

        public async Task<Sight> GetById(int id)
        {
            var sight = await Context.Sights.FindAsync(id);

            return sight;
        }

        public async Task<int> Create(Sight newSight)
        {
            Context.Sights.Add(newSight);
            await Context.SaveChangesAsync();

            return newSight.Id;
        }

        public async Task<bool> Update(Sight sight)
        {
            Context.Sights.Attach(sight);
            var changes = await Context.SaveChangesAsync();

            return changes > 0;
        }

        public async Task<bool> Delete(Sight sight)
        {
            Context.Sights.Remove(sight);
            var changes = await Context.SaveChangesAsync();

            return changes > 0;
        }
    }
}
