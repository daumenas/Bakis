﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Models
{
    public class Question : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public int Points { get; set; }
        [Required]
        public string Title { get; set; }
        public int CorrectAnswer { get; set; }
        public QuizTemplate QuizTemplate { get; set; }
        public ICollection<QuestionChoice> QuestionChoices { get; set; }
    }
}
