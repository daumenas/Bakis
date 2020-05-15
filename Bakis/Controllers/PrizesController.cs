using Bakis.Dtos.Prizes;
using Bakis.Services.Interfaces;
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
    public class PrizesController : ControllerBase
    {

        private readonly IPrizeService _prizeService;

        public PrizesController(IPrizeService prizeService)
        {
            _prizeService = prizeService;
        }

        // GET: api/Prizes
        [HttpGet]
        [Produces(typeof(GetPrizeDto[]))]
        public async Task<IActionResult> Get()
        {
            var prizes = await _prizeService.GetAll();

            return Ok(prizes);
        }

        // GET: api/Prizes/5
        [HttpGet("{id}")]
        [Produces(typeof(GetPrizeDto))]
        public async Task<IActionResult> Get(int id)
        {
            var prize = await _prizeService.GetById(id);

            if (prize == null)
                return NotFound();

            return Ok(prize);
        }

        // PUT: api/Prizes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdatePrizeDto updatePrize)
        {
            await _prizeService.Update(id, updatePrize);

            return NoContent();
        }

        // POST: api/Prizes
        [HttpPost]
        [Produces(typeof(NewPrizeDto))]
        public async Task<IActionResult> Post(NewPrizeDto newPrize)
        {
            var createdPrize = await _prizeService.Create(newPrize);

            return Ok(createdPrize);
        }

        // DELETE: api/Prizes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _prizeService.Delete(id);

            return NoContent();
        }
    }
}
