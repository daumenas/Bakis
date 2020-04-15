using Bakis.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bakis.Infrastructure.Database.Repositories;
using Bakis.Infrastructure.Database.Models;
using AutoMapper;
using Bakis.Dtos.Sights;

namespace Bakis.Services
{
    public class MapsService : IMapsService
    {
        private readonly IRepositoryBase<Sight> _repository;
        private readonly IMapper _mapper;

        public MapsService(ISightRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        internal async Task<double> GetDistance(double userLatitude, double userLongitude, 
            double locationLatitude, double locationLongitude)
        {
            var R = 6371e3; // For Meters
            double userLat1 = Math.Sin(Radians(userLatitude));
            double locationLat1 = Math.Sin(Radians(locationLatitude));

            double cLat = Radians(userLatitude) - Radians(locationLatitude);
            //double userLat2 = Math.Cos(Radians(userLatitude));
            //double locationLat2 = Math.Cos(Radians(locationLatitude));
            double cLon = Radians(userLongitude) - Radians(locationLongitude);

            var a = Math.Sin(cLat) / 2 * Math.Sin(cLat) / 2 + Math.Cos(userLat1) * Math.Cos(locationLat1) * 
                Math.Sin(cLon) / 2 * Math.Sin(cLon) / 2;

            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

            //double cosD = sLat1 * sLat2 + cLat1 * cLat2 * cLon;

            //double d = Math.Acos(cosD);

            //double dist = R * d;

            var dist = R * c;

            return dist;
        }

        private double Radians(double x)
        {
            return x * Math.PI * x / 180;
        }
    }
}
