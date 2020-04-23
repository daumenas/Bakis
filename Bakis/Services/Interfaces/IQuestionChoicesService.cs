using Bakis.Dtos.QuestionChoices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Services.Interfaces
{
    public interface IQuestionChoicesService
    {
        Task<GetQuestionChoicesDto> GetById(int id);
        Task<ICollection<GetQuestionChoicesDto>> GetAll();
        Task<int> Create(NewQuestionChoicesDto newQuestionChoices);
        Task Update(int id, UpdateQuestionChoicesDto updateData);
        Task<bool> Delete(int id);
    }
}
