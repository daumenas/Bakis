using Bakis.Dtos.QuizTemplates;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Services.Interfaces
{
    public interface IQuizTemplateService
    {
        Task<GetQuizTemplateDto> GetById(int id);
        Task<ICollection<GetQuizTemplateDto>> GetAll();
        Task<NewQuizTemplateDto> Create(NewQuizTemplateDto newQuizTemplate);
        Task Update(int id, UpdateQuizTemplateDto updateData);
        Task<bool> Delete(int id);
        Task<GetQuizTemplateDto> GetBySightId(int id);
    }
}
