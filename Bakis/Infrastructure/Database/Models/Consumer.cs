using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Models
{
    public class Consumer : BaseEntity
    {
        [Required]
        [MinLength(3)]
        [MaxLength(15)]
        public string Name { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(20)]
        public string Surname { get; set; }
        [Required]
        public DateTime BirthdayDate { get; set; }
        [Required]
        [MinLength(4)]
        public string Email { get; set; }
        [NotMapped]
        public string Token { get; set; }
        public int Points { get; set; }
    }
}
