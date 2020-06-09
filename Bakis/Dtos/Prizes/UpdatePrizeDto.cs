using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Dtos.Prizes
{
    public class UpdatePrizeDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Picture { get; set; }
        public int Points { get; set; }
        public bool Available { get; set; }
    }
}
