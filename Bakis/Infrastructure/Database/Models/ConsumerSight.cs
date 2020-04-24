using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Models
{
    public class ConsumerSight : BaseEntity
    {
        public int ConsumerId { get; set; }
        public Consumer Consumer { get; set; }
        public int SightId { get; set; }
        public Sight Sight { get; set; }
        public bool IsGamePlayed { get; set; }
    }
}
