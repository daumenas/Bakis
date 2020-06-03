using Bakis.Infrastructure.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Repositories
{
    public interface IPrizeRepository : IRepositoryBase<Prize>
    {
        Task<bool> RemovePurchase(int userid, int prizeid);
        Task<ICollection<ConsumerPrize>> GetAllPrizesConsumers();
    }
}
