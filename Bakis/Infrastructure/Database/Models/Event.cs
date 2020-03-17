using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Models
{
    public class Event : BaseEntity
    {
        [Required]
        [MinLength(3)]
        [MaxLength(15)]
        public string Name { get; set; }
        [Required]
        [MinLength(3)]
        public string Description { get; set; }
        [Required]
        public int Points { get; set; }
        public string Address { get; set; }
        public double Latitude { get; set; }
        public double Longtitude { get; set; }
        [Required]
        public DateTime From { get; set; }
        [Required]
        public DateTime To { get; set; }
        public DateTime Time { get; set; }

    }
}
