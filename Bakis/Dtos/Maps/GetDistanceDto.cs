using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Dtos.Maps
{
    public class GetDistanceDto
    {
        public double UserLatitude { get; set; }
        public double UserLongitude { get; set; }
        public double LocationLatitude { get; set; }
        public double LocationLongitude { get; set; }
    }
}
