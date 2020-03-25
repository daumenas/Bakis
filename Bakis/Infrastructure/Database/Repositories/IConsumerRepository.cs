using Bakis.Infrastructure.Database.Models;
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
    }
}
