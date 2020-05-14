using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Bakis.Dtos.Questions;
using Bakis.Infrastructure.Database.Models;
using Bakis.Infrastructure.Database.Repositories;
using Bakis.Services.Interfaces;

namespace Bakis.Services
{
    public class QuestionService : IQuestionService
    {
        private readonly IQuestionRepository _repository;
        private readonly IMapper _mapper;

        public QuestionService(IQuestionRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<GetQuestionDto> GetById(int id)
        {
            var question = await _repository.GetById(id);
            var questionDto = _mapper.Map<GetQuestionDto>(question);

            return questionDto;
        }

        public async Task<ICollection<GetQuestionDto>> GetAll()
        {
            var questions = await _repository.GetAll();
            List<Question> unselectedQuestion = new List<Question>();
            foreach (var question in questions)
            {
                if (question.QuizTemplate == null)
                {
                    unselectedQuestion.Add(question);
                }
            }
            var questionsDto = _mapper.Map<GetQuestionDto[]>(unselectedQuestion);

            return questionsDto;
        }

        public async Task<NewQuestionDto> Create(NewQuestionDto newQuestionDto)
        {
            if (newQuestionDto == null)
                throw new ArgumentNullException(nameof(newQuestionDto));

            var newQuestion = _mapper.Map<Question>(newQuestionDto);
            await _repository.Create(newQuestion);
            var QuestionDto = _mapper.Map<NewQuestionDto>(newQuestion);

            return QuestionDto;
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _repository.GetById(id);

            if (item == null)
                return false;

            var deleted = await _repository.Delete(item);
            return deleted;
        }

        public async Task Update(int id, UpdateQuestionDto updateData)
        {
            if (updateData == null)
                throw new ArgumentNullException(nameof(updateData));

            var itemToUpdate = await _repository.GetById(id);

            if (itemToUpdate == null)
                throw new InvalidOperationException();

            _mapper.Map(updateData, itemToUpdate);
            await _repository.Update(itemToUpdate);
        }

        public async Task<ICollection<GetQuestionDto>> GetAllEmptyAndByQuizId(int id)
        {
            var questions = await _repository.GetAllByQuizId(id);
            var questionsDto = _mapper.Map<GetQuestionDto[]>(questions);

            return questionsDto;
        }
    }
}
