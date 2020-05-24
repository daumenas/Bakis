using Bakis.Infrastructure.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Dtos.Prizes
{
    public class GetPrizeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Picture { get; set; }
        public int Points { get; set; }
        public bool IsPrizeClaimed { get; set; }
    }
}
