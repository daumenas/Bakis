using Bakis.Dtos.Questions;
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
    public class QuestionsController : ControllerBase
    {
        private readonly IQuestionService _questionsService;
        public QuestionsController(IQuestionService questionsService)
        {
            _questionsService = questionsService;

        }

        // GET: api/Questions
        [HttpGet]
        [Produces(typeof(GetQuestionDto[]))]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Get()
        {
            var questions = await _questionsService.GetAll();
            return Ok(questions);
        }

        // GET: api/Questions/5
        [HttpGet("{id}")]
        [Produces(typeof(GetQuestionDto))]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Get(int id)
        {
            var question = await _questionsService.GetById(id);

            if (question == null)
                return NotFound();

            return Ok(question);
        }

        // PUT: api/Questions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateQuestionDto updateQuestionDto)
        {
            await _questionsService.Update(id, updateQuestionDto);

            return NoContent();
        }

        // POST: api/Questions
        [HttpPost]
        [Produces(typeof(NewQuestionDto))]
        public async Task<IActionResult> Post(NewQuestionDto newQuestionDto)
        {
            var createdQuestion = await _questionsService.Create(newQuestionDto);

            return Ok(createdQuestion);
        }

        // DELETE: api/Questions/5
        [HttpDelete("{id}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _questionsService.Delete(id);

            return NoContent();
        }

        // GET: api/Questions/5
        [HttpGet("{id}/{name}")]
        [Produces(typeof(GetQuestionDto[]))]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetQuestionByQuizId(int id, string name)
        {
            var question = await _questionsService.GetAllEmptyAndByQuizId(id);

            if (question == null)
                return NotFound();

            return Ok(question);
        }

        [HttpGet("allquizchoices/{id}")]
        [Produces(typeof(GetQuestionDto[]))]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllEmptyAndQuizQuestionChoices(int id, string name)
        {
            var question = await _questionsService.GetAllEmptyAndQuizQuestionChoices(id);

            if (question == null)
                return NotFound();

            return Ok(question);
        }
    }
}
