using Bakis.Dtos.QuizTemplates;
using Bakis.Infrastructure.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Dtos.Sights
{
    public class GetSightDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Points { get; set; }
        public string Address { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public GetQuizTemplateDto QuizTemplate { get; set; }
        public int CheckedIn { get; set; }
        public bool IsCheckedIn { get; set; }
        public ICollection<ConsumerSight> UserSight { get; set; }
    }
}
