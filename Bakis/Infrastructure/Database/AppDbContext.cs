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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ConsumerSight>().HasKey(entity =>
            new
            {
                entity.ConsumerId,
                entity.SightId
            });
            builder.Entity<ConsumerEvent>().HasKey(entity =>
            new
            {
                entity.ConsumerId,
                entity.EventId
            });

            builder.Entity<ConsumerSight>()
                .HasOne(entity => entity.Sight)
                .WithMany(e => e.UserSight)
                .HasForeignKey(entity => entity.SightId);
            builder.Entity<ConsumerSight>()
                .HasOne(entity => entity.Consumer)
                .WithMany(e => e.UserSight)
                .HasForeignKey(entity => entity.ConsumerId);

            builder.Entity<ConsumerEvent>()
                .HasOne(entity => entity.CityEvent)
                .WithMany(e => e.UserEvent)
                .HasForeignKey(entity => entity.EventId);
            builder.Entity<ConsumerEvent>()
                .HasOne(entity => entity.Consumer)
                .WithMany(e => e.UserEvent)
                .HasForeignKey(entity => entity.ConsumerId);

            base.OnModelCreating(builder);

        }
    }
}
