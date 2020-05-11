using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Models
{
    public class QuizTemplate : BaseEntity
    {
        public string Title { get; set; }
        public ICollection<Question> Questions { get; set; }
        [ForeignKey("Sight")]
        public int SightId { get; set; }
        public virtual Sight Sight { get; set; }
        public ICollection<ConsumerQuiz> UserQuiz { get; set; }
    }
}
