using Microsoft.AspNetCore.Identity;

namespace Bakis.Infrastructure.Database.Models
{
    public class User : IdentityUser
    {
        public int ConsumerId { get; set; }
        public Consumer Consumer { get; set; }
    }
}
