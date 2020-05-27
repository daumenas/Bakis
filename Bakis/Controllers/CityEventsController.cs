using Bakis.Dtos.CityEvents;
using Bakis.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin")]
    public class CityEventsController : ControllerBase
    {
        private readonly ICityEventService _cityEventService;

        public CityEventsController(ICityEventService cityEventService)
        {
            _cityEventService = cityEventService;
        }

        // GET: api/CityEvents
        [HttpGet]
        [Produces(typeof(GetCityEventDto[]))]
        public async Task<IActionResult> Get()
        {
            var cityEvents = await _cityEventService.GetAll();

            return Ok(cityEvents);
        }

        // GET: api/CityEvents/byuser/1
        [HttpGet("byuser/{id}")]
        [Produces(typeof(GetCityEventDto[]))]
        public async Task<IActionResult> GetAllByUserId(int id)
        {
            var cityEvents = await _cityEventService.GetAllByUserId(id);

            return Ok(cityEvents);
        }

        // GET: api/CityEvents/5
        [HttpGet("{id}")]
        [Produces(typeof(GetCityEventDto))]
        public async Task<IActionResult> Get(int id)
        {
            var cityEvent = await _cityEventService.GetById(id);

            if (cityEvent == null)
                return NotFound();

            return Ok(cityEvent);
        }

        // PUT: api/CityEvents/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateCityEventDto newCityEvent)
        {
            await _cityEventService.Update(id, newCityEvent);

            return NoContent();
        }

        // POST: api/CityEvents
        [HttpPost]
        [Produces(typeof(NewCityEventDto))]
        public async Task<IActionResult> Post(NewCityEventDto newCityEvent)
        {
            var createdCityEvent = await _cityEventService.Create(newCityEvent);

            return Ok(createdCityEvent);
        }

        // DELETE: api/CityEvents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _cityEventService.Delete(id);

            return NoContent();
        }

        // GET: api/CityEvents/getAllUsers/5
        [HttpGet("getAllUsers/{id}")]
        [Produces(typeof(GetCityEventDto))]
        public async Task<IActionResult> GetAllUsersWhoCheckedIn(int id)
        {
            var cityEvent = await _cityEventService.GetAllUsersWhoCheckedIn(id);

            if (cityEvent == null)
                return NotFound();

            return Ok(cityEvent);
        }
    }
}
