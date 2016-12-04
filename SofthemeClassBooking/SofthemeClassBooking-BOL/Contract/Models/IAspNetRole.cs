using System.Collections.Generic;

namespace SofthemeClassBooking_BOL.Contract.Models
{
    public interface IAspNetRole
    {
        string Id { get; set; }
        string Name { get; set; }
        ICollection<IAspNetUser> AspNetUsers { get; set; }
    }
}
