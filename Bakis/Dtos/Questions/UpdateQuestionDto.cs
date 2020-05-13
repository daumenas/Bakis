using Bakis.Infrastructure.Database.Models;
using System;
using Bakis.Dtos.QuestionChoices;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Dtos.Questions
{
    public class UpdateQuestionDto
    {
        public int Points { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public int CorrectAnswer { get; set; }
        public ICollection<GetQuestionChoicesDto> QuestionChoices { get; set; }
    }
}
