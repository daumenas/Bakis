using Bakis.Infrastructure.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Repositories
{
    public interface ICityEventRepository : IRepositoryBase<CityEvent>
    {
        Task<ICollection<ConsumerEvent>> GetAllUsersWhoCheckedIn(int id);
    }
}
