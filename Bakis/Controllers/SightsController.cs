using Bakis.Dtos.Sights;
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
    public class SightsController : ControllerBase
    {
        
        private readonly ISightService _sightService;

        public SightsController(ISightService sightService)
        {
            _sightService = sightService;
        }

        // GET: api/Sights
        [HttpGet]
        [Produces(typeof(GetSightDto[]))]
        public async Task<IActionResult> Get()
        {
            var sights = await _sightService.GetAll();

            return Ok(sights);
        }

        // GET: api/Sights/5
        [HttpGet("{id}")]
        [Produces(typeof(GetSightDto))]
        public async Task<IActionResult> Get(int id)
        {
            var sight = await _sightService.GetById(id);

            if (sight == null)
                return NotFound();

            return Ok(sight);
        }

        // PUT: api/Sights/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateSightDto updateSight)
        {
            await _sightService.Update(id, updateSight);

            return NoContent();
        }

        // POST: api/Sights
        [HttpPost]
        [Produces(typeof(NewSightDto))]
        public async Task<IActionResult> Post(NewSightDto newSight)
        {
            var createdSight = await _sightService.Create(newSight);

            return Ok(createdSight);
        }

        // DELETE: api/Sights/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _sightService.Delete(id);

            return NoContent();
        }
    }
}
