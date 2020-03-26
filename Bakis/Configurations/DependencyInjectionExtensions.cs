using Bakis.Infrastructure.Database.Repositories;
using Bakis.Services;
using Bakis.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bakis.Configurations
{
    public static class DependencyInjectionExtensions
    {
        public static IServiceCollection AddAllDependencies(this IServiceCollection service)
        {
            return service
                .AddInfrastructureDependencies()
                .AddApplicationDependencies();
        }

        public static IServiceCollection AddInfrastructureDependencies(this IServiceCollection service)
        {
            return service
                .AddScoped<IConsumerRepository, ConsumerRepository>()
                .AddScoped<ICityEventRepository, CityEventRepository>();
        }

        public static IServiceCollection AddApplicationDependencies(this IServiceCollection service)
        {
            return service
                .AddScoped<IUserService, UserService>()
                .AddScoped<IConsumersService, ConsumersService>()
                .AddScoped<IAuthService, AuthService>()
                .AddScoped<ICityEventService, CityEventService>()
                .AddScoped<IAuthService, AuthService>();
        }
    }
}
