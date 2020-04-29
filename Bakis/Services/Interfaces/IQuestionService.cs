using Bakis.Dtos.Questions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Services.Interfaces
{
    public interface IQuestionService
    {
        Task<GetQuestionDto> GetById(int id);
        Task<ICollection<GetQuestionDto>> GetAll();
        Task<NewQuestionDto> Create(NewQuestionDto newClient);
        Task Update(int id, UpdateQuestionDto updateData);
        Task<bool> Delete(int id);
        Task<ICollection<GetQuestionDto>> GetAllByQuizId(int id);
    }
}
