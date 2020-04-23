using Bakis.Infrastructure.Database.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Repositories
{
    public class QuizTemplateRepository : IQuizTemplateRepository
    {
        protected readonly AppDbContext _context;
        public QuizTemplateRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ICollection<QuizTemplate>> GetAll()
        {
            var quizTemplates = await _context.QuizTemplates.Include(c => c.Questions).ToArrayAsync();

            return quizTemplates;
        }

        public async Task<QuizTemplate> GetById(int id)
        {
            var quizTemplate = await _context.QuizTemplates.FindAsync(id);

            return quizTemplate;
        }

        public async Task<int> Create(QuizTemplate newQuizTemplate)
        {
            var createQuiz = new QuizTemplate()
            {
                Title = newQuizTemplate.Title
            };
            _context.QuizTemplates.Add(createQuiz);
            await _context.SaveChangesAsync();
            createQuiz.Questions = newQuizTemplate.Questions;
            _context.QuizTemplates.Attach(createQuiz);
            var changes = await _context.SaveChangesAsync();

            return newQuizTemplate.Id;
        }

        public async Task<bool> Update(QuizTemplate newQuizTemplate)
        {
            _context.QuizTemplates.Attach(newQuizTemplate);
            var changes = await _context.SaveChangesAsync();

            return changes > 0;
        }

        public async Task<bool> Delete(QuizTemplate newQuizTemplate)
        {
            _context.QuizTemplates.Remove(newQuizTemplate);
            var changes = await _context.SaveChangesAsync();

            return changes > 0;
        }
    }
}
