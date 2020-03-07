using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Bakis.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ControllerExample : ControllerBase
    {

        private readonly ILogger<ControllerExample> _logger;

        public ControllerExample(ILogger<ControllerExample> logger)
        {
            _logger = logger;
        }
    }
}
