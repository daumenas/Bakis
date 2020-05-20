using Bakis.Dtos.Consumers;
using Bakis.Dtos.Users;
using Bakis.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Bakis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsumersController : ControllerBase
    {
        private readonly IConsumersService _consumersService;
        private readonly IUserService _userService;
        public ConsumersController(IConsumersService consumersService, IUserService userService)
        {
            _consumersService = consumersService;
            _userService = userService;
        }

        // GET: api/Consumers
        [HttpGet]
        [Produces(typeof(GetConsumerDto[]))]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Get()
        {
            var consumers = await _consumersService.GetAll();
            return Ok(consumers);
        }

        [HttpGet]
        [Route("self")]
        [Authorize]
        public async Task<IActionResult> GetSelf()
        {
            var userEmail = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var currentUser = await _userService.GetCurrentUser(userEmail);

            return Ok(currentUser);
        }

        // GET: api/Consumers/5
        [HttpGet("{id}")]
        [Produces(typeof(GetConsumerDto))]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Get(int id)
        {
            var consumer = await _consumersService.GetById(id);

            if (consumer == null)
                return NotFound();

            return Ok(consumer);
        }

        // PUT: api/Consumers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateConsumerDto updateConsumerDto)
        {
            await _consumersService.Update(id, updateConsumerDto);

            return NoContent();
        }

        // PUT: api/Consumers/buyPrize/5/11/true/1
        [HttpGet("buyPrize/{id}/{prizeId}")]
        public async Task<IActionResult> Get(int id, int prizeId)
        {
            await _consumersService.BuyPrize(id, prizeId);

            return NoContent();
        }

        // PUT: api/Consumers/5/11/true/1
        [HttpGet("{id}/{sightId}/{isGamePlayed}/{points}")]
        public async Task<IActionResult> Get(int id, int sightId, bool isGamePlayed, int points)
        {
            await _consumersService.UpdateVisited(id, sightId, isGamePlayed, points);

            return NoContent();
        }

        // PUT: api/Consumers/5/11
        [HttpGet("{id}/{eventId}")]
        public async Task<IActionResult> GetEventCheckIn(int id, int eventId)
        {
            await _consumersService.UpdateVisitedEvent(id, eventId);

            return NoContent();
        }

        // POST: api/Consumers
        [HttpPost]
        [Produces(typeof(NewConsumerDto))]
        public async Task<IActionResult> Post(NewConsumerDto newConsumerDto)
        {
            var createdConsumer = await _consumersService.Create(newConsumerDto);

            return Ok(createdConsumer);
        }

        // DELETE: api/Consumer/5
        [HttpDelete("{id}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _consumersService.Delete(id);

            return NoContent();
        }

        [HttpPost("{id}/ChangePassword")]
        public async Task<IActionResult> ChangePassword(int id, UpdatePasswordDto passwordDto)
        {
            await _userService.ChangePassword(id, passwordDto);

            return Ok();
        }

        [HttpGet]
        [Produces(typeof(bool))]
        [Route("{email}/exists")]
        public async Task<IActionResult> EmailExists(string email)
        {
            return Ok(await _consumersService.EmailExists(email));
        }
    }
}
