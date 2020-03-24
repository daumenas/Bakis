using AutoMapper;
using Bakis.Dtos.CityEvents;
using Bakis.Dtos.Consumers;
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
        }
    }
}
