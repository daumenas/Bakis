﻿using Bakis.Infrastructure.Database.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Repositories
{
    public class QuestionRepository : IQuestionRepository
    {
        protected readonly AppDbContext _context;
        public QuestionRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ICollection<Question>> GetAll()
        {
            var questions = await _context.Questions.Include(c => c.QuestionChoices).ToArrayAsync();

            return questions;
        }

        public async Task<Question> GetById(int id)
        {
            var questions = await _context.Questions.FindAsync(id);

            return questions;
        }

        public async Task<int> Create(Question newQuestion)
        {
            var createQuestion = new Question()
            {
                CorrectAnswer = newQuestion.CorrectAnswer,
                Name = newQuestion.Name,
                Title = newQuestion.Title,
                Type = newQuestion.Type
            };
            _context.Questions.Add(createQuestion);
            await _context.SaveChangesAsync();
            createQuestion.QuestionChoices = newQuestion.QuestionChoices;
            _context.Questions.Attach(createQuestion);
            var changes = await _context.SaveChangesAsync();

            return newQuestion.Id;
        }

        public async Task<bool> Update(Question question)
        {
            _context.Questions.Attach(question);
            var changes = await _context.SaveChangesAsync();

            return changes > 0;
        }

        public async Task<bool> Delete(Question question)
        {
            _context.Questions.Remove(question);
            var changes = await _context.SaveChangesAsync();

            return changes > 0;
        }
    }
}
