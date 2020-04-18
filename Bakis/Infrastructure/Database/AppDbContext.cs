using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bakis.Infrastructure.Database.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Bakis.Infrastructure.Database
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public DbSet<Sight> Sights { get; set; }
        public DbSet<CityEvent> CityEvent { get; set; }
        public DbSet<Consumer> Consumers { get; set; }
        public DbSet<QuestionChoice> QuestionChoices { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<QuizTemplate> QuizTemplates { get; set; }

        private readonly IConfiguration _configuration;
        public AppDbContext(DbContextOptions options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }
    }
}
