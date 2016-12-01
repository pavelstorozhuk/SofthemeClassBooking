using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SofthemeClassBooking_BOL.Contract
{
    public interface IAspNetUser
    {
         string Id { get; set; }

         string Email { get; set; }

         bool EmailConfirmed { get; set; }

         string PasswordHash { get; set; }

         string SecurityStamp { get; set; }

         string PhoneNumber { get; set; }

         bool PhoneNumberConfirmed { get; set; }

         bool TwoFactorEnabled { get; set; }

         DateTime? LockoutEndDateUtc { get; set; }

         bool LockoutEnabled { get; set; }

         int AccessFailedCount { get; set; }

         string UserName { get; set; }
         ICollection<IEvent> Events { get; set; }
         ICollection<IAspNetRole> AspNetRoles { get; set; }
    }
}
