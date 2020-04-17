using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Models
{
    public class QuizTemplate : BaseEntity
    {
        public string Title { get; set; }
        public ICollection<Question> Questions { get; set; }
    }
}
