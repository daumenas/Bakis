﻿using Bakis.Dtos.Consumers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bakis.Infrastructure.Database.Models;

namespace Bakis.Dtos.CityEvents
{
    public class GetCityEventDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Points { get; set; }
        public string Address { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public DateTime Time { get; set; }
        public DateTime EndTime { get; set; }
        public int Amount { get; set; }
        public int CheckedIn { get; set; }
        public bool Approval { get; set; }
        public bool IsCheckedIn { get; set; }
        public int CreatedBy { get; set; }
        public List<string> ConsumerFullName { get; set; }
    }
}
