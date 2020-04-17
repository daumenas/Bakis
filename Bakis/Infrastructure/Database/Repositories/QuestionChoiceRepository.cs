using Bakis.Infrastructure.Database.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Repositories
{
    public class QuestionChoiceRepository : IQuestionChoiceRepository
    {
        protected readonly AppDbContext _context;

        public QuestionChoiceRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ICollection<QuestionChoice>> GetAll()
        {
            var questionChoices = await _context.QuestionChoices.ToArrayAsync();

            return questionChoices;
        }

        public async Task<QuestionChoice> GetById(int id)
        {
            var questionChoice = await _context.QuestionChoices.FindAsync(id);

            return questionChoice;
        }

        public async Task<int> Create(QuestionChoice newQuestionChoice)
        {
            _context.QuestionChoices.Add(newQuestionChoice);
            await _context.SaveChangesAsync();

            return newQuestionChoice.Id;
        }

        public async Task<bool> Update(QuestionChoice questionChoice)
        {
            _context.QuestionChoices.Attach(questionChoice);
            var changes = await _context.SaveChangesAsync();

            return changes > 0;
        }

        public async Task<bool> Delete(QuestionChoice questionChoice)
        {
            _context.QuestionChoices.Remove(questionChoice);
            var changes = await _context.SaveChangesAsync();

            return changes > 0;
        }
    }
}
