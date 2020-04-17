using AutoMapper;
using Bakis.Dtos.CityEvents;
using Bakis.Dtos.Consumers;
using Bakis.Dtos.QuestionChoices;
using Bakis.Dtos.Questions;
using Bakis.Dtos.QuizTemplates;
using Bakis.Dtos.Sights;
using Bakis.Infrastructure.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Configurations
{
    public class AutoMapperConfiguration : Profile
    {
        public AutoMapperConfiguration() : this("MeetKaunas")
        { }

        protected AutoMapperConfiguration(string name) : base(name)
        {
            CreateMap<NewConsumerDto, Consumer>(MemberList.None);
            CreateMap<Consumer, NewConsumerDto>(MemberList.None);

            CreateMap<GetConsumerDto, Consumer>(MemberList.None);
            CreateMap<Consumer, GetConsumerDto>(MemberList.None);

            CreateMap<UpdateConsumerDto, Consumer>(MemberList.None);
            CreateMap<Consumer, UpdateConsumerDto>(MemberList.None);

            CreateMap<NewCityEventDto, CityEvent>(MemberList.None);
            CreateMap<CityEvent, NewCityEventDto>(MemberList.None);

            CreateMap<GetCityEventDto, CityEvent>(MemberList.None);
            CreateMap<CityEvent, GetCityEventDto>(MemberList.None);

            CreateMap<UpdateCityEventDto, CityEvent>(MemberList.None);
            CreateMap<CityEvent, UpdateCityEventDto>(MemberList.None);

            CreateMap<NewSightDto, Sight>(MemberList.None);
            CreateMap<Sight, NewSightDto>(MemberList.None);

            CreateMap<GetSightDto, Sight>(MemberList.None);
            CreateMap<Sight, GetSightDto>(MemberList.None);

            CreateMap<UpdateSightDto, Sight>(MemberList.None);
            CreateMap<Sight, UpdateSightDto>(MemberList.None);

            CreateMap<NewQuestionDto, Question>(MemberList.None);
            CreateMap<Question, NewQuestionDto>(MemberList.None);

            CreateMap<GetQuestionDto, Question>(MemberList.None);
            CreateMap<Question, GetQuestionDto>(MemberList.None);

            CreateMap<UpdateQuestionDto, Question>(MemberList.None);
            CreateMap<Question, UpdateQuestionDto>(MemberList.None);

            CreateMap<NewQuestionChoicesDto, QuestionChoice>(MemberList.None);
            CreateMap<QuestionChoice, NewQuestionChoicesDto>(MemberList.None);

            CreateMap<GetQuestionChoicesDto, QuestionChoice>(MemberList.None);
            CreateMap<QuestionChoice, GetQuestionChoicesDto>(MemberList.None);

            CreateMap<UpdateQuestionChoicesDto, QuestionChoice>(MemberList.None);
            CreateMap<QuestionChoice, UpdateQuestionChoicesDto>(MemberList.None);

            CreateMap<NewQuizTemplateDto, QuizTemplate>(MemberList.None);
            CreateMap<QuizTemplate, NewQuizTemplateDto>(MemberList.None);

            CreateMap<GetQuizTemplateDto, QuizTemplate>(MemberList.None);
            CreateMap<QuizTemplate, GetQuizTemplateDto>(MemberList.None);

            CreateMap<UpdateQuizTemplateDto, QuizTemplate>(MemberList.None);
            CreateMap<QuizTemplate, UpdateQuizTemplateDto>(MemberList.None);
        }
    }
}
