using Bakis.Infrastructure.Database.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Repositories
{
    public abstract class RepositoryBase<TEntity> : IRepositoryBase<TEntity> where TEntity : BaseEntity
    {
        protected readonly AppDbContext Context;
        protected abstract DbSet<TEntity> ItemSet { get; }

        protected RepositoryBase(AppDbContext context)
        {
            Context = context;
        }


        public virtual async Task<ICollection<TEntity>> GetAll()
        {
            var items = await ItemSet.ToArrayAsync();

            return items;
        }

        public virtual async Task<TEntity> GetById(int id)
        {
            var items = await ItemSet.FirstOrDefaultAsync(obj => obj.Id == id);

            return items;
        }

        public virtual async Task<int> Create(TEntity entity)
        {
            ItemSet.Add(entity);
            await Context.SaveChangesAsync();

            return entity.Id;
        }

        public virtual async Task<bool> Update(TEntity entity)
        {
            ItemSet.Attach(entity);
            var changes = await Context.SaveChangesAsync();

            return changes > 0;
        }

        public virtual async Task<bool> Delete(TEntity entity)
        {
            ItemSet.Remove(entity);
            var changes = await Context.SaveChangesAsync();

            return changes > 0;
        }
    }
}
