using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Dtos.Events
{
    public class GetEventDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Points { get; set; }
        public string Address { get; set; }
        public double Latitude { get; set; }
        public string Longtitude { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public DateTime Time { get; set; }
    }
}
