using AutoMapper;
using Bakis.Dtos.Events;
using Bakis.Infrastructure.Database.Models;
using Bakis.Infrastructure.Database.Repositories;
using Bakis.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Services
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _repository;
        private readonly IMapper _mapper;
        private readonly IEventService _eventService;

        public EventService(
            IEventRepository repository,
            IMapper mapper,
            IEventService eventService
            )
        {
            _repository = repository;
            _mapper = mapper;
            _eventService = eventService;
        }

        public async Task<GetEventDto> GetById(int id)
        {
            var _event = await _repository.GetById(id);
            var _eventDto = _mapper.Map<GetEventDto>(_event);

            return _eventDto;
        }

        public async Task<ICollection<GetEventDto>> GetAll()
        {
            var events = await _repository.GetAll();
            var eventsDto = _mapper.Map<GetEventDto[]>(events);

            return eventsDto;
        }

        public async Task<NewEventDto> Create(NewEventDto newEventDto)
        {
            if (newEventDto == null)
            {
                throw new ArgumentNullException(nameof(newEventDto));
            }

            var newEvent = _mapper.Map<Event>(newEventDto);

            await _repository.Create(newEvent);

            var eventDto = _mapper.Map<NewEventDto>(newEvent);

            return eventDto;
        }
        public async Task<bool> Delete(int id)
        {
            var item = await _repository.GetById(id);

            if (item == null)
                return false;

            var deleted = await _repository.Delete(item);

            return deleted;
        }

        public async Task Update(int id, UpdateEventDto updateEventData)
        {
            if (updateEventData == null)
                throw new ArgumentNullException(nameof(updateEventData));

            var eventToUpdate = await _repository.GetById(id);

            if (eventToUpdate == null)
            {
                throw new InvalidOperationException();
            }

            _mapper.Map(updateEventData, eventToUpdate);

            await _repository.Update(eventToUpdate);
            await _eventService.Update(id, updateEventData);
        }

    }
}
