using AutoMapper;
using Bakis.Dtos.Consumers;
using Bakis.Dtos.Sights;
using Bakis.Infrastructure.Database.Models;
using Bakis.Infrastructure.Database.Repositories;
using Bakis.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Services
{
    public class ConsumersService : IConsumersService
    {
        private readonly IConsumerRepository _repository;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly ISightRepository _sightRepository;
        private readonly ICityEventRepository _cityEventRepository;
        private readonly IConsumerSightRepository _consumerSightRepository;


        public ConsumersService(
            IConsumerRepository repository,
            IMapper mapper,
            IUserService userService,
            ISightRepository sightRepository,
            ICityEventRepository cityEventRepository,
            IConsumerSightRepository consumerSightRepository
            )
        {
            _repository = repository;
            _mapper = mapper;
            _userService = userService;
            _sightRepository = sightRepository;
            _cityEventRepository = cityEventRepository;
            _consumerSightRepository = consumerSightRepository;
        }

        public async Task<GetConsumerDto> GetById(int id)
        {
            var consumer = await _repository.GetById(id);
            var consumerDto = _mapper.Map<GetConsumerDto>(consumer);

            return consumerDto;
        }

        public async Task<ICollection<GetConsumerDto>> GetAll()
        {
            var consumers = await _repository.GetAll();
            var consumersDto = _mapper.Map<GetConsumerDto[]>(consumers);
            foreach (var consumer in consumersDto)
            {
                consumer.Role = await _userService.GetUserRole(consumer.Id);
            }

            return consumersDto;
        }

        public async Task<NewConsumerDto> Create(NewConsumerDto newConsumerDto)
        {
            if (newConsumerDto == null)
            {
                throw new ArgumentNullException(nameof(newConsumerDto));
            }

            var password = newConsumerDto.Password;

            if (string.IsNullOrWhiteSpace(password))
            {
                throw new Exception("Password is required");
            }

            if (_repository.FindByEmail(newConsumerDto.Email).Result != null)
            {
                throw new Exception("Email \"" + newConsumerDto.Email + "\" is already taken");
            }

            var newConsumer = _mapper.Map<Consumer>(newConsumerDto);

            await _repository.Create(newConsumer);
            await _userService.Create(newConsumer, newConsumerDto);

            var consumerDto = _mapper.Map<NewConsumerDto>(newConsumer);

            return consumerDto;
        }
        public async Task<bool> Delete(int id)
        {
            var item = await _repository.GetById(id);

            if (item == null)
                return false;

            var deleted = await _repository.Delete(item);

            return deleted;
        }

        public async Task Update(int id, UpdateConsumerDto updateConsumerData)
        {
            if (updateConsumerData == null)
                throw new ArgumentNullException(nameof(updateConsumerData));

            var consumerToUpdate = await _repository.GetById(id);

            if (consumerToUpdate == null)
            {
                throw new InvalidOperationException();
            }

            if (updateConsumerData.Email != consumerToUpdate.Email)
            {
                // email has changed so check if the new email is already taken
                if (_repository.FindByEmail(updateConsumerData.Email).Result != null)
                    throw new Exception("Email " + updateConsumerData.Email + " is already taken");
            }

            _mapper.Map(updateConsumerData, consumerToUpdate);

            await _repository.Update(consumerToUpdate);
            if(updateConsumerData.Role != null)
            {
                await _userService.Update(id, updateConsumerData);
            }
        }

        public async Task<bool> EmailExists(string email)
        {
            return await _repository.EmailExists(email);
        }

        public async Task<bool> UpdateVisited(int id, int sightId, bool isGamePlayed, int points)
        {
            bool isCheckedIn = false;
            var consumerSight = new ConsumerSight();
            var sight = await _sightRepository.GetById(sightId);
            var consumer = await GetById(id);
            if (consumer.UserSight != null)
            {
                consumerSight = await IsCheckedInSight(id, sightId);
                if (consumerSight != null)
                {
                    isCheckedIn = true;
                    if(consumerSight.IsGamePlayed)
                    {
                        return false;
                    }

                }
            }
            if (consumerSight == null)
            {
                consumerSight = new ConsumerSight
                {
                    ConsumerId = id,
                    SightId = sightId,
                    IsGamePlayed = isGamePlayed
                };
                consumer.UserSight.Add(consumerSight);
            }
            if (isCheckedIn)
            {
                consumer = await PlayGame(consumerSight, consumer, points);
            }
            else if (isCheckedIn == false && isGamePlayed == true)
            {
                consumer = await CheckIn(consumer, sight.Points);
                consumer = await PlayGame(consumerSight, consumer, points);
            }
            else
            {
                consumer = await CheckIn(consumer, sight.Points);
            }
            return await UpdatePoints(id, consumer);
        }

        public async Task<ConsumerSight> IsCheckedInSight(int userId, int sightId)
        {
            return await _repository.IsCheckedInSight(userId, sightId);
        }

        public async Task<ConsumerEvent> IsCheckedInEvent(int userId, int eventId)
        {
            return await _repository.IsCheckedInEvent(userId, eventId);
        }

        public async Task<bool> UpdatePoints(int id, GetConsumerDto updateConsumerPoints)
        {
            var consumerToUpdate = await _repository.GetById(id);
            _mapper.Map(updateConsumerPoints, consumerToUpdate);
            await _repository.Update(consumerToUpdate);
            return true;
        }

        public async Task<GetConsumerDto> CheckIn(GetConsumerDto currentConsumer,int Points)
        {
            currentConsumer.Points += Points;
            return currentConsumer;
        }

        public async Task<GetConsumerDto> PlayGame(ConsumerSight consumerSight, GetConsumerDto currentConsumer, int points)
        {
            consumerSight.IsGamePlayed = true;
            currentConsumer.Points += points;
            await _consumerSightRepository.Update(consumerSight);
            return currentConsumer;
        }

        public async Task<bool> UpdateVisitedEvent(int id, int eventId)
        {
            var consumerEvent = new ConsumerEvent();
            var cityEvent = await _cityEventRepository.GetById(eventId);
            var consumer = await GetById(id);
            if (consumer.UserEvent != null)
            {
                consumerEvent = await IsCheckedInEvent(id, eventId);
            }
            if (consumerEvent == null)
            {
                consumerEvent = new ConsumerEvent
                {
                    ConsumerId = id,
                    EventId = eventId
                };
                consumer.UserEvent.Add(consumerEvent);
                consumer = await CheckIn(consumer, cityEvent.Points);
                return await UpdatePoints(id, consumer);
            }
            return false;
            
        }


    }
}
