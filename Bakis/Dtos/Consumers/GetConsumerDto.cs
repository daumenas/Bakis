using Bakis.Infrastructure.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Dtos.Consumers
{
    public class GetConsumerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime BirthdayDate { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public int Points { get; set; }
        public ICollection<ConsumerSight> UserSight { get; set; }
        public ICollection<ConsumerEvent> UserEvent { get; set; }
        public ICollection<ConsumerQuiz> UserQuiz { get; set; }
    }
}
