﻿using Bakis.Infrastructure.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Repositories
{
    public interface IConsumerRepository : IRepositoryBase<Consumer>
    {
        Task<Consumer> FindByEmail(string email);
        Task<bool> EmailExists(string email);
        Task<ConsumerSight> IsCheckedInSight(int id, int sightId);
        Task<ConsumerEvent> IsCheckedInEvent(int id, int eventId);
        Task<ConsumerPrize> IsPrizeBought(int id, int prizeId);
    }
}
