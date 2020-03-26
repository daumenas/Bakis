using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Dtos.Sights
{
    public class GetSightDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Points { get; set; }
        public string Address { get; set; }
        public double Latitude { get; set; }
        public double Langtitude { get; set; }
    }
}
