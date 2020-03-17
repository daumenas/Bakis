using Bakis.Infrastructure.Database.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Repositories
{
    public class EventRepository : IEventRepository
    {
        protected readonly AppDbContext Context;
        public EventRepository(AppDbContext context)
        {
            Context = context;
        }

        public async Task<ICollection<Event>> GetAll()
        {
            var events = await Context.Events.ToArrayAsync();

            return events;
        }

        public async Task<Event> GetById(int id)
        {
            var _event = await Context.Events.FindAsync(id);

            return _event;
        }

        public async Task<int> Create(Event newEvent)
        {
            Context.Events.Add(newEvent);
            await Context.SaveChangesAsync();

            return newEvent.Id;
        }

        public async Task<bool> Update(Event _event)
        {
            Context.Events.Attach(_event);
            var changes = await Context.SaveChangesAsync();

            return changes > 0;
        }

        public async Task<bool> Delete(Event _event)
        {
            Context.Events.Remove(_event);
            var changes = await Context.SaveChangesAsync();

            return changes > 0;
        }
    }
}
