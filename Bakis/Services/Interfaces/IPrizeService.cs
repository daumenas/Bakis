using Bakis.Dtos.Prizes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Services.Interfaces
{
    public interface IPrizeService
    {
        Task<GetPrizeDto> GetById(int id);
        Task<ICollection<GetPrizeDto>> GetAll();
        Task<NewPrizeDto> Create(NewPrizeDto newPrize);
        Task Update(int id, UpdatePrizeDto updateData);
        Task<bool> Delete(int id);
        Task<ICollection<GetPrizeDto>> GetAllByUserId(int id);
    }
}
