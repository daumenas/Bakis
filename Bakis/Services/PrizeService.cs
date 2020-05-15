using AutoMapper;
using Bakis.Dtos.Prizes;
using Bakis.Infrastructure.Database.Models;
using Bakis.Infrastructure.Database.Repositories;
using Bakis.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Services
{
    public class PrizeService : IPrizeService
    {
        private readonly IPrizeRepository _repository;
        private readonly IMapper _mapper;

        public PrizeService(IPrizeRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<GetPrizeDto> GetById(int id)
        {
            var prize = await _repository.GetById(id);
            var prizeDto = _mapper.Map<GetPrizeDto>(prize);

            return prizeDto;
        }

        public async Task<ICollection<GetPrizeDto>> GetAll()
        {
            var prizes = await _repository.GetAll();
            var prizesDto = _mapper.Map<GetPrizeDto[]>(prizes);

            return prizesDto;
        }

        public async Task<NewPrizeDto> Create(NewPrizeDto newPrizeDto)
        {
            if (newPrizeDto == null)
                throw new ArgumentNullException(nameof(newPrizeDto));

            var newPrize = _mapper.Map<Prize>(newPrizeDto);
            await _repository.Create(newPrize);
            var prizeDto = _mapper.Map<NewPrizeDto>(newPrize);

            return prizeDto;
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _repository.GetById(id);

            if (item == null)
                return false;

            var deleted = await _repository.Delete(item);
            return deleted;
        }

        public async Task Update(int id, UpdatePrizeDto updateData)
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
