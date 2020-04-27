using Bakis.Infrastructure.Database.Models;
using Bakis.Dtos.QuestionChoices;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Bakis.Dtos.Questions
{
    public class NewQuestionDto
    {
        public string Type { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public int CorrectAnswer { get; set; }
        public ICollection<GetQuestionChoicesDto> QuestionChoices { get; set; }
    }
}
