using AutoMapper;
using Bakis.Dtos.QuestionChoices;
using Bakis.Infrastructure.Database.Models;
using Bakis.Infrastructure.Database.Repositories;
using Bakis.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Services
{
    public class QuestionChoicesService : IQuestionChoicesService
    {
        private readonly IRepositoryBase<QuestionChoice> _repository;
        private readonly IMapper _mapper;

        public QuestionChoicesService(IQuestionChoiceRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<GetQuestionChoicesDto> GetById(int id)
        {
            var questionChoice = await _repository.GetById(id);
            var questionChoiceDto = _mapper.Map<GetQuestionChoicesDto>(questionChoice);

            return questionChoiceDto;
        }

        public async Task<ICollection<GetQuestionChoicesDto>> GetAll()
        {
            var questionChoices = await _repository.GetAll();
            var questionChoicesDto = _mapper.Map<GetQuestionChoicesDto[]>(questionChoices);

            return questionChoicesDto;
        }

        public async Task<int> Create(NewQuestionChoicesDto newQuestionChoicesDto)
        {
            if (newQuestionChoicesDto == null)
                throw new ArgumentNullException(nameof(newQuestionChoicesDto));

            var newQuestionChoice = _mapper.Map<QuestionChoice>(newQuestionChoicesDto);
            var newChoiceId = await _repository.Create(newQuestionChoice);

            return newChoiceId;
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _repository.GetById(id);

            if (item == null)
                return false;

            var deleted = await _repository.Delete(item);
            return deleted;
        }

        public async Task Update(int id, UpdateQuestionChoicesDto updateData)
        {
            if (updateData == null)
                throw new ArgumentNullException(nameof(updateData));

            var itemToUpdate = await _repository.GetById(id);

            if (itemToUpdate == null)
                throw new InvalidOperationException();

            _mapper.Map(updateData, itemToUpdate);
            await _repository.Update(itemToUpdate);
        }
    }
}
