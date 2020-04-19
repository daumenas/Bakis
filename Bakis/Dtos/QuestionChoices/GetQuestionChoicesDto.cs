using Bakis.Infrastructure.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Dtos.QuestionChoices
{
    public class GetQuestionChoicesDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
    }
}
