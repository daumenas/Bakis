using Bakis.Infrastructure.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bakis.Dtos.Questions;

namespace Bakis.Dtos.QuizTemplates
{
    public class NewQuizTemplateDto
    {
        public string Title { get; set; }
        public ICollection<GetQuestionDto> Questions { get; set; }
    }
}
