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
        protected readonly IQuestionRepository _questionRepository;
        public QuizTemplateRepository(AppDbContext context, IQuestionRepository questionRepository)
        {
            _context = context;
            _questionRepository = questionRepository;
        }
        public async Task<ICollection<QuizTemplate>> GetAll()
        {
            var quizTemplates = await _context.QuizTemplates.Include(c => c.Questions).Include(c => c.Sight).ToArrayAsync();

            return quizTemplates;
        }

        public async Task<QuizTemplate> GetById(int id)
        {
            var quizTemplate = await _context.QuizTemplates.Include(c => c.Sight).Include(c => c.Questions)
                .Where(c => c.Id == id).FirstOrDefaultAsync();
            quizTemplate.Questions = await _context.Questions.Include(c => c.QuestionChoices)
                .Where(c => c.QuizTemplate.Id == quizTemplate.Id).ToArrayAsync();

            return quizTemplate;
        }

        public async Task<QuizTemplate> GetByIdWithoutQuestion(int id)
        {
            var quizTemplate = await _context.QuizTemplates.FindAsync(id);
            return quizTemplate;
        }

        public async Task<int> Create(QuizTemplate newQuizTemplate)
        {
            _context.QuizTemplates.Add(newQuizTemplate);
            var changes = await _context.SaveChangesAsync();

            return newQuizTemplate.Id;
        }

        public async Task<bool> Update(QuizTemplate newQuizTemplate)
        {
            var quiz = _context.QuizTemplates.Include(c => c.Questions).FirstOrDefault(x => x.Id == newQuizTemplate.Id);
            if(quiz != null)
            {
                foreach (var question in quiz.Questions.ToList())
                {
                    if (!newQuizTemplate.Questions.Any(c => c.Id == question.Id))
                        _context.Questions.Remove(question);
                }
                foreach (var childModel in newQuizTemplate.Questions)
                {
                    var existingChild = quiz.Questions
                        .Where(c => c.Id == childModel.Id)
                        .SingleOrDefault();

                    if (existingChild != null)
                    {
                        _context.Entry(existingChild).CurrentValues.SetValues(childModel);
                    }
                    else
                    {
                        var newChild = await _questionRepository.GetById(childModel.Id);
                        quiz.Questions.Add(newChild);
                    }
                }
            }
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

        public async Task<bool> RemoveAllQuestions(int id)
        {
            var quizTemplate = await _context.QuizTemplates.Include(c => c.Questions)
                .Where(c => c.Id == id).FirstOrDefaultAsync();
            quizTemplate.Questions = await _context.Questions.Include(c => c.QuestionChoices)
                .Where(c => c.QuizTemplate.Id == quizTemplate.Id).ToListAsync();
            quizTemplate.Questions = null;
            _context.QuizTemplates.Update(quizTemplate);
            var changes = await _context.SaveChangesAsync();
            return changes > 0;
        }
    }
}
