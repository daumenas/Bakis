using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Models
{
    public class ConsumerEvent : BaseEntity
    {
        public int ConsumerId { get; set; }
        public Consumer Consumer { get; set; }
        public int EventId { get; set; }
        public CityEvent CityEvent { get; set; }
    }
}
