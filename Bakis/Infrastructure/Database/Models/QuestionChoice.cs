using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Models
{
    public class QuestionChoice : BaseEntity
    {
        public string Title { get; set; }
        public int? QuestionId { get; set; }
        public Question Question { get; set; }
    }
}
