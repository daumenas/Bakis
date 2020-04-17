using Bakis.Dtos.QuizTemplates;
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
    public class QuizTemplatesController : ControllerBase
    {
        private readonly IQuizTemplateService _quizTemplateService;
        public QuizTemplatesController(IQuizTemplateService quizTemplateService)
        {
            _quizTemplateService = quizTemplateService;
        }

        // GET: api/QuizTemplate
        [HttpGet]
        [Produces(typeof(GetQuizTemplateDto[]))]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Get()
        {
            var quizTemplate = await _quizTemplateService.GetAll();
            return Ok(quizTemplate);
        }

        // GET: api/QuizTemplate/5
        [HttpGet("{id}")]
        [Produces(typeof(GetQuizTemplateDto))]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Get(int id)
        {
            var quizTemplate = await _quizTemplateService.GetById(id);

            if (quizTemplate == null)
                return NotFound();

            return Ok(quizTemplate);
        }

        // PUT: api/QuizTemplate/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateQuizTemplateDto updateQuizTemplateDto)
        {
            await _quizTemplateService.Update(id, updateQuizTemplateDto);

            return NoContent();
        }

        // POST: api/QuizTemplate
        [HttpPost]
        [Produces(typeof(NewQuizTemplateDto))]
        public async Task<IActionResult> Post(NewQuizTemplateDto newQuizTemplateDto)
        {
            var createdQuizTemplate = await _quizTemplateService.Create(newQuizTemplateDto);

            return Ok(createdQuizTemplate);
        }

        // DELETE: api/QuizTemplate/5
        [HttpDelete("{id}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _quizTemplateService.Delete(id);

            return NoContent();
        }
    }
}
