using Bakis.Dtos.Sights;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Services.Interfaces
{
    public interface ISightService
    {
        Task<GetSightDto> GetById(int id);
        Task<ICollection<GetSightDto>> GetAll();
        Task<NewSightDto> Create(NewSightDto newSight);
        Task Update(int id, UpdateSightDto updateData);
        Task<bool> Delete(int id);
    }
}
