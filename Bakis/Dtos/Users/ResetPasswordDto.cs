using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Dtos.Users
{
    public class ResetPasswordDto
    {
        public string Token { get; set; }
        public string Password { get; set; }
    }
}
