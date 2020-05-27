using Bakis.Infrastructure.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Infrastructure.Database.Repositories
{
    public interface IQuizTemplateRepository : IRepositoryBase<QuizTemplate>
    {
        Task<QuizTemplate> GetBySightId(int id);
        Task<bool> RemoveAllQuestions(int id);
        Task<QuizTemplate> GetByIdWithoutQuestion(int id);

    }
}
