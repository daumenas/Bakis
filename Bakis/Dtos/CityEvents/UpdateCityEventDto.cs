using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Dtos.CityEvents
{
    public class UpdateCityEventDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public double Points { get; set; }
        public string Address { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public DateTime Time { get; set; }
    }
}
