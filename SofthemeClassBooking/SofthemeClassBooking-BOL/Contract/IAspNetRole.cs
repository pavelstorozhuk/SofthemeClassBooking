using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SofthemeClassBooking_BOL.Contract
{
    public interface IAspNetRole
    {
        string Id { get; set; }
        string Name { get; set; }
        ICollection<IAspNetUser> AspNetUsers { get; set; }
    }
}
