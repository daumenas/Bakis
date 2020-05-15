﻿using Bakis.Infrastructure.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Repositories
{
    public interface ISightRepository : IRepositoryBase<Sight>
    {
        Task<ICollection<Sight>> GetAllWithoutQuiz();
    }
}
