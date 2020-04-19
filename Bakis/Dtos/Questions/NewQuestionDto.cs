using Bakis.Infrastructure.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Dtos.Questions
{
    public class NewQuestionDto
    {
        public string Type { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public int CorrectAnswer { get; set; }
        public ICollection<QuestionChoice> QuestionChoices { get; set; }
    }
}
