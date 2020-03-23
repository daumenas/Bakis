using Bakis.Infrastructure.Database.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Repositories
{
    public class CityEventRepository : ICityEventRepository
    {
        protected readonly AppDbContext Context;
        public CityEventRepository(AppDbContext context)
        {
            Context = context;
        }

        public async Task<ICollection<CityEvent>> GetAll()
        {
            var cityEvents = await Context.CityEvent.ToArrayAsync();

            return cityEvents;
        }

        public async Task<CityEvent> GetById(int id)
        {
            var cityEvent = await Context.CityEvent.FindAsync(id);

            return cityEvent;
        }

        public async Task<int> Create(CityEvent newCityEvent)
        {
            Context.CityEvent.Add(newCityEvent);
            await Context.SaveChangesAsync();

            return newCityEvent.Id;
        }

        public async Task<bool> Update(CityEvent cityEvent)
        {
            Context.CityEvent.Attach(cityEvent);
            var changes = await Context.SaveChangesAsync();

            return changes > 0;
        }

        public async Task<bool> Delete(CityEvent cityEvent)
        {
            Context.CityEvent.Remove(cityEvent);
            var changes = await Context.SaveChangesAsync();

            return changes > 0;
        }
    }
}
