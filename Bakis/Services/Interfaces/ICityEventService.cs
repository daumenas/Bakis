using Bakis.Dtos.CityEvents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Services.Interfaces
{
    public interface ICityEventService
    {
        Task<GetCityEventDto> GetById(int id);
        Task<ICollection<GetCityEventDto>> GetAll();
        Task<NewCityEventDto> Create(NewCityEventDto newCityEvent);
        Task Update(int id, UpdateCityEventDto updateData);
        Task<bool> Delete(int id);
    }
}
