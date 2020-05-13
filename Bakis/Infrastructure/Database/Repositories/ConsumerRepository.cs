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
        private readonly IRepositoryBase<ConsumerSight> _consumerSightRepository;
        public ConsumerRepository(AppDbContext context, IRepositoryBase<ConsumerSight> consumerSightRepository)
        {
            Context = context;
            _consumerSightRepository = consumerSightRepository;
        }

        public async Task<ICollection<Consumer>> GetAll()
        {
            var consumers = await Context.Consumers.ToArrayAsync();

            return consumers;
        }

        public async Task<Consumer> GetById(int id)
        {
            var consumer = await Context.Consumers.FindAsync(id);
            consumer.UserSight = await Context.ConsumerSight.Where(c => c.ConsumerId == id).ToArrayAsync();
            consumer.UserEvent = await Context.ConsumerEvent.Where(c => c.ConsumerId == id).ToArrayAsync();
            consumer.UserQuiz = await Context.ConsumerQuiz.Where(c => c.ConsumerId == id).ToArrayAsync();

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

        public async Task<bool> EmailExists(string email)
        {
            return await Context.Consumers.Select(consumer => consumer.Email).ContainsAsync(email);
        }

        public async Task<bool> UpdateVisited(int id, int sightId)
        {
            var sight = await Context.Sights.SingleOrDefaultAsync(sight => sight.Id == sightId);
            var consumer = await Context.Consumers.SingleOrDefaultAsync(cons => cons.Id == id);

            var consumerSight = new ConsumerSight()
            {
                    ConsumerId = consumer.Id,
                    SightId = sight.Id,
                    Consumer = consumer,
                    Sight = sight,
            };

            var newConsumerSightId = await _consumerSightRepository.Create(consumerSight);
            consumer.Points += sight.Points;
            Context.Consumers.Attach(consumer);
            var changes = await Context.SaveChangesAsync();

            return changes > 0;
        }
    }
}