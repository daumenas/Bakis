using Bakis.Dtos.Consumers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Services.Interfaces
{
    public interface IConsumersService
    {
        Task<GetConsumerDto> GetById(int id);
        Task<ICollection<GetConsumerDto>> GetAll();
        Task<NewConsumerDto> Create(NewConsumerDto newClient);
        Task Update(int id, UpdateConsumerDto updateData);
        Task<bool> Delete(int id);
        Task<bool> EmailExists(string email);
        Task<bool> UpdateVisited(int id, int sightId, bool isGamePlayed, int points);
    }
}
