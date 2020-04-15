using AutoMapper;
using Bakis.Dtos.Maps;
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
        private readonly IRepositoryBase<Sight> _repository;
        private readonly IMapper _mapper;
        private readonly MapsService _mapsService;

        public SightService(ISightRepository repository, IMapper mapper, MapsService mapsService)
        {
            _repository = repository;
            _mapper = mapper;
            _mapsService = mapsService;
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

        public async Task<ICollection<GetSightDto>> GetAllByDistance(double longitude, double latitude)
        {
            var sights = await _repository.GetAll();
            var sightsDto = _mapper.Map<GetSightDto[]>(sights);
            foreach (var sight in sightsDto)
            {
                var distance = await _mapsService.GetDistance(latitude, longitude, sight.Latitude, sight.Longitude);
                if (distance < 100)
                {
                    sight.InDistance = true;
                }
            }
            return sightsDto;
        }
    }
}
