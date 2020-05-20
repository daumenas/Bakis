using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Bakis.Dtos.QuizTemplates;
using Bakis.Infrastructure.Database.Models;
using Bakis.Infrastructure.Database.Repositories;
using Bakis.Services.Interfaces;

namespace Bakis.Services
{
    public class QuizTemplateService : IQuizTemplateService
    {
        private readonly IQuizTemplateRepository _repository;
        private readonly IQuestionRepository _questionRepository;
        private readonly ISightRepository _sightRepository;
        private readonly IMapper _mapper;

        public QuizTemplateService(IQuizTemplateRepository repository, IMapper mapper, ISightRepository sightRepository,
            IQuestionRepository questionRepository)
        {
            _repository = repository;
            _mapper = mapper;
            _sightRepository = sightRepository;
            _questionRepository = questionRepository;
        }

        public async Task<GetQuizTemplateDto> GetById(int id)
        {
            var quizTemplate = await _repository.GetById(id);
            var quizTemplateDto = _mapper.Map<GetQuizTemplateDto>(quizTemplate);

            quizTemplateDto.SightName = quizTemplate.Sight.Name;
            return quizTemplateDto;
        }

        public async Task<GetQuizTemplateDto> GetBySightId(int id)
        {
            var quizTemplate = await _repository.GetBySightId(id);
            quizTemplate.Questions = await _questionRepository.GetAllByQuizId(id);
            var quizTemplateDto = _mapper.Map<GetQuizTemplateDto>(quizTemplate);
            return quizTemplateDto;
        }

        public async Task<ICollection<GetQuizTemplateDto>> GetAll()
        {
            var quizTemplates = await _repository.GetAll();
            var quizTemplatesDto = _mapper.Map<GetQuizTemplateDto[]>(quizTemplates);
            foreach (var quizDto in quizTemplatesDto)
            {
                foreach (var quiz in quizTemplates)
                {
                    if(quizDto.SightId == quiz.Sight.Id)
                    {
                        quizDto.SightName = quiz.Sight.Name;
                    }
                }  
            }
            return quizTemplatesDto;
        }

        public async Task<NewQuizTemplateDto> Create(NewQuizTemplateDto newQuizTemplateDto)
        {
            if (newQuizTemplateDto == null)
                throw new ArgumentNullException(nameof(newQuizTemplateDto));

            var newQuizTemplate = _mapper.Map<QuizTemplate>(newQuizTemplateDto);
            await _repository.Create(newQuizTemplate);
            var QuizTemplateDto = _mapper.Map<NewQuizTemplateDto>(newQuizTemplate);

            return QuizTemplateDto;
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _repository.GetById(id);

            if (item == null)
                return false;

            var deleted = await _repository.Delete(item);
            return deleted;
        }

        public async Task Update(int id, UpdateQuizTemplateDto updateData)
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
