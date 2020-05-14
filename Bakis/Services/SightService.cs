using AutoMapper;
using Bakis.Dtos.Sights;
using Bakis.Infrastructure.Database.Models;
using Bakis.Infrastructure.Database.Repositories;
using Bakis.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Services
{
    public class SightService : ISightService
    {
        private readonly ISightRepository _repository;
        private readonly IConsumersService _consumersService;
        private readonly IMapper _mapper;

        public SightService(ISightRepository repository, IMapper mapper, IConsumersService consumersService)
        {
            _repository = repository;
            _mapper = mapper;
            _consumersService = consumersService;
        }

        public async Task<GetSightDto> GetById(int id)
        {
            var sight = await _repository.GetById(id);
            var sightDto = _mapper.Map<GetSightDto>(sight);

            return sightDto;
        }

        public async Task<ICollection<GetSightDto>> GetAll()
        {
            var sights = await _repository.GetAll();
            var sightsDto = _mapper.Map<GetSightDto[]>(sights);

            return sightsDto;
        }

        public async Task<NewSightDto> Create(NewSightDto newSightDto)
        {
            if (newSightDto == null)
                throw new ArgumentNullException(nameof(newSightDto));

            var newSight = _mapper.Map<Sight>(newSightDto);
            await _repository.Create(newSight);
            var sightDto = _mapper.Map<NewSightDto>(newSight);

            return sightDto;
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _repository.GetById(id);

            if (item == null)
                return false;

            var deleted = await _repository.Delete(item);
            return deleted;
        }

        public async Task Update(int id, UpdateSightDto updateData)
        {
            if (updateData == null)
                throw new ArgumentNullException(nameof(updateData));

            var itemToUpdate = await _repository.GetById(id);

            if (itemToUpdate == null)
                throw new InvalidOperationException();

            _mapper.Map(updateData, itemToUpdate);
            await _repository.Update(itemToUpdate);
        }

        public async Task<ICollection<GetSightDto>> GetAllByUserId(int id)
        {
            var sights = await _repository.GetAll();
            var sightsDto = _mapper.Map<GetSightDto[]>(sights);
            var consumer = await _consumersService.GetById(id);
            foreach (var sight in sightsDto)
            {
                //sight.IsCheckedIn = false;
                //sight.IsGamePlayed = false;
                foreach (var userSight in consumer.UserSight)
                {
                    if(userSight.SightId == sight.Id)
                    {
                        sight.IsCheckedIn = true;
                        if (userSight.IsGamePlayed)
                        {
                            sight.IsGamePlayed = true;
                        }
                        break;
                    }
                }
            }
            return sightsDto;
        }
    }
}
