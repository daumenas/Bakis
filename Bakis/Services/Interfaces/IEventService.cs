using Bakis.Dtos.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Services.Interfaces
{
    public interface IEventService
    {
        Task<GetEventDto> GetById(int id);
        Task<ICollection<GetEventDto>> GetAll();
        Task<NewEventDto> Create(NewEventDto newEvent);
        Task Update(int id, UpdateEventDto updateData);
        Task<bool> Delete(int id);
    }
}
