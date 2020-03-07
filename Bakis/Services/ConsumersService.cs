using AutoMapper;
using Bakis.Dtos.Consumers;
using Bakis.Infrastructure.Database.Models;
using Bakis.Infrastructure.Database.Repositories;
using Bakis.Services.Interfaces;
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

        public ConsumersService(
            IConsumerRepository repository,
            IMapper mapper,
            IUserService userService
            )
        {
            _repository = repository;
            _mapper = mapper;
            _userService = userService;
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
            await _userService.Update(id, updateConsumerData);
        }
    }
}
