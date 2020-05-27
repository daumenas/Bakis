using AutoMapper;
using Bakis.Dtos.CityEvents;
using Bakis.Infrastructure.Database.Models;
using Bakis.Infrastructure.Database.Repositories;
using Bakis.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Services
{
    public class CityEventService : ICityEventService
    {
        private readonly ICityEventRepository _repository;
        private readonly IConsumersService _consumersService;
        private readonly IMapper _mapper;

        public CityEventService(ICityEventRepository repository, IMapper mapper, IConsumersService consumersService)
        {
            _repository = repository;
            _mapper = mapper;
            _consumersService = consumersService;
        }

        public async Task<GetCityEventDto> GetById(int id)
        {
            var cityEvent = await _repository.GetById(id);
            var cityEventDto = _mapper.Map<GetCityEventDto>(cityEvent);

            return cityEventDto;
        }

        public async Task<ICollection<GetCityEventDto>> GetAll()
        {
            var cityEvents = await _repository.GetAll();
            var cityEventsDto = _mapper.Map<GetCityEventDto[]>(cityEvents);

            return cityEventsDto;
        }

        public async Task<NewCityEventDto> Create(NewCityEventDto newCityEventDto)
        {
            if (newCityEventDto == null)
                throw new ArgumentNullException(nameof(newCityEventDto));

            var newcityEvent = _mapper.Map<CityEvent>(newCityEventDto);
            await _repository.Create(newcityEvent);
            var cityEventDto = _mapper.Map<NewCityEventDto>(newcityEvent);

            return cityEventDto;
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _repository.GetById(id);

            if (item == null)
                return false;

            var deleted = await _repository.Delete(item);
            return deleted;
        }

        public async Task Update(int id, UpdateCityEventDto updateData)
        {
            if (updateData == null)
                throw new ArgumentNullException(nameof(updateData));

            var itemToUpdate = await _repository.GetById(id);

            if (itemToUpdate == null)
                throw new InvalidOperationException();

            _mapper.Map(updateData, itemToUpdate);
            await _repository.Update(itemToUpdate);
        }

        public async Task<ICollection<GetCityEventDto>> GetAllByUserId(int id)
        {
            var cityEvents = await _repository.GetAll();
            var cityEventsDto = _mapper.Map<GetCityEventDto[]>(cityEvents);
            var consumer = await _consumersService.GetById(id);
            foreach (var userEvent in consumer.UserEvent)
            {
                foreach (var cityEvent in cityEventsDto)
                {
                    if (userEvent.EventId == cityEvent.Id)
                    {
                        cityEvent.IsCheckedIn = true;
                        break;
                    }
                }
            }
            return cityEventsDto;
        }

        public async Task<GetCityEventDto> GetAllUsersWhoCheckedIn(int id)
        {
            var cityEvents = await _repository.GetById(id);
            var cityEventsConsumers = await _repository.GetAllUsersWhoCheckedIn(id);
            var cityEventDto = _mapper.Map<GetCityEventDto>(cityEvents);
            cityEventDto.ConsumerFullName = new List<string>();
            var consumers = await _consumersService.GetAll();
            if (cityEventsConsumers != null)
            {
                foreach (var cityEventConsumer in cityEventsConsumers)
                {
                    string fullName = cityEventConsumer.Consumer.Name + " " + cityEventConsumer.Consumer.Surname;
                    cityEventDto.ConsumerFullName.Add(fullName);
                }
            }
            return cityEventDto;
        }
    }
}
