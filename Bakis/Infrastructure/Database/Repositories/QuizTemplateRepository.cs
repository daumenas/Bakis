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
            var quizTemplates = await _context.QuizTemplates.Include(c => c.Questions).Include(c => c.Sight).ToArrayAsync();

            return quizTemplates;
        }

        public async Task<QuizTemplate> GetById(int id)
        {
            var quizTemplate = await _context.QuizTemplates.Include(c => c.Questions)
                .Where(c => c.Id == id).FirstOrDefaultAsync();
            quizTemplate.Questions = await _context.Questions.Include(c => c.QuestionChoices)
                .Where(c => c.QuizTemplate.Id == quizTemplate.Id).ToArrayAsync();

            return quizTemplate;
        }

        public async Task<int> Create(QuizTemplate newQuizTemplate)
        {
            var createQuiz = new QuizTemplate()
            {
                Title = newQuizTemplate.Title,
                SightId = newQuizTemplate.SightId
            };
            _context.QuizTemplates.Add(createQuiz);
            await _context.SaveChangesAsync();
            createQuiz.Questions = newQuizTemplate.Questions;
            _context.QuizTemplates.Attach(createQuiz);
            var changes = await _context.SaveChangesAsync();

            var sightToUpdate = await _context.Sights.FindAsync(createQuiz.SightId);
            sightToUpdate.QuizTemplate = createQuiz;
            _context.Sights.Attach(sightToUpdate);
            var changesSight = await _context.SaveChangesAsync();

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

        public async Task<QuizTemplate> GetBySightId(int id)
        {
            var quizTemplate = await _context.QuizTemplates.Include(c => c.Questions).Where(c => c.SightId == id).FirstOrDefaultAsync();
            return quizTemplate;
        }
    }
}
