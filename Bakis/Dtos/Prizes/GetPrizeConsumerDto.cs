using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Dtos.Prizes
{
    public class GetPrizeConsumerDto
    {
        public int ConsumerId { get; set; }
        public int PrizeId { get; set; }
        public string ConsumerEmail { get; set; }
        public string PrizeName { get; set; }

    }
}
