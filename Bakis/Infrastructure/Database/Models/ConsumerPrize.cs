using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Models
{
    public class ConsumerPrize : BaseEntity
    {
        public int ConsumerId { get; set; }
        public Consumer Consumer { get; set; }
        public int PrizeId { get; set; }
        public Prize Prize { get; set; }
    }
}
