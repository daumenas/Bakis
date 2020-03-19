﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Dtos.Consumers
{
    public class UpdateConsumerDto
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime BirthdayDate { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}
