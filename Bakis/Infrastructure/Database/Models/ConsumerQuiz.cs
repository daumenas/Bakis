using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Models
{
    public class ConsumerQuiz: BaseEntity
    {
        public int ConsumerId { get; set; }
        public Consumer Consumer { get; set; }
        public int QuizTemplateId { get; set; }
        public QuizTemplate QuizTemplate { get; set; }
    }
}
