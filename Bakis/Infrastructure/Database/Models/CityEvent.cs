using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Models
{
    public class CityEvent : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public int Points { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public double Latitude { get; set; }
        [Required]
        public double Longitude { get; set; }
        [Required]
        public DateTime DateFrom { get; set; }
        [Required]
        public DateTime DateTo { get; set; }
        public DateTime Time { get; set; }
        public bool Approval { get; set; }
        public ICollection<ConsumerEvent> UserEvent { get; set; }
    }
}
