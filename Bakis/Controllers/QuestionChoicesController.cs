using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bakis.Dtos.QuestionChoices;
using Bakis.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bakis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionChoicesController : ControllerBase
    {
        private readonly IQuestionChoicesService _questionChoicesService;
        public QuestionChoicesController(IQuestionChoicesService questionChoicesService)
        {
            _questionChoicesService = questionChoicesService;
        }

        // GET: api/QuestionChoices
        [HttpGet]
        [Produces(typeof(GetQuestionChoicesDto[]))]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Get()
        {
            var consumers = await _questionChoicesService.GetAll();
            return Ok(consumers);
        }

        // GET: api/QuestionChoices/5
        [HttpGet("{id}")]
        [Produces(typeof(GetQuestionChoicesDto))]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Get(int id)
        {
            var questionChoice = await _questionChoicesService.GetById(id);

            if (questionChoice == null)
                return NotFound();

            return Ok(questionChoice);
        }

        // PUT: api/QuestionChoices/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateQuestionChoicesDto updateQuestionChoicesDto)
        {
            await _questionChoicesService.Update(id, updateQuestionChoicesDto);

            return NoContent();
        }

        // POST: api/QuestionChoices
        [HttpPost]
        [Produces(typeof(int))]
        public async Task<IActionResult> Post(NewQuestionChoicesDto newQuestionChoicesDto)
        {
            var createdQuestionChoiceId = await _questionChoicesService.Create(newQuestionChoicesDto);

            return Ok(createdQuestionChoiceId);
        }

        // DELETE: api/QuestionChoices/5
        [HttpDelete("{id}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _questionChoicesService.Delete(id);

            return NoContent();
        }
    }
}
