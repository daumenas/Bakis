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
        public DbSet<ConsumerSight> ConsumerSight { get; set; }
        public DbSet<ConsumerEvent> ConsumerEvent { get; set; }
        public DbSet<ConsumerQuiz> ConsumerQuiz { get; set; }

        private readonly IConfiguration _configuration;
        public AppDbContext(DbContextOptions options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<QuizTemplate>()
                .HasMany(c => c.Questions)
                .WithOne(e => e.QuizTemplate)
                .OnDelete(DeleteBehavior.SetNull);

            builder.Entity<Question>()
                .HasMany(c => c.QuestionChoices)
                .WithOne(e => e.Question)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<ConsumerQuiz>().HasKey(entity =>
            new
            {
                entity.ConsumerId,
                entity.QuizTemplateId
            });
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
            builder.Entity<ConsumerQuiz>()
            .HasOne(entity => entity.QuizTemplate)
            .WithMany(e => e.UserQuiz)
            .HasForeignKey(entity => entity.QuizTemplateId);
            builder.Entity<ConsumerQuiz>()
                .HasOne(entity => entity.Consumer)
                .WithMany(e => e.UserQuiz)
                .HasForeignKey(entity => entity.ConsumerId);

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
