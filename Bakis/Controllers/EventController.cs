using Bakis.Dtos.Events;
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
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;
        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }

        // GET: api/Events
        [HttpGet]
        [Produces(typeof(GetEventDto[]))]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Get()
        {
            var events = await _eventService.GetAll();
            return Ok(events);
        }

        // GET: api/Events/5
        [HttpGet("{id}")]
        [Produces(typeof(GetEventDto))]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Get(int id)
        {
            var _event = await _eventService.GetById(id);

            if (_event == null)
                return NotFound();

            return Ok(_event);
        }

        // PUT: api/Events/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateEventDto updateEventDto)
        {
            await _eventService.Update(id, updateEventDto);

            return NoContent();
        }

        // POST: api/Events
        [HttpPost]
        [Produces(typeof(NewEventDto))]
        public async Task<IActionResult> Post(NewEventDto newEventDto)
        {
            var createdEvent = await _eventService.Create(newEventDto);

            return Ok(createdEvent);
        }

        // DELETE: api/Event/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _eventService.Delete(id);

            return NoContent();
        }
    }
}
