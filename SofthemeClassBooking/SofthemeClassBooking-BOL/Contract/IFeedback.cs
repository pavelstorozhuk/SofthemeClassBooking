using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SofthemeClassBooking_BOL.Contract
{
    public interface IFeedback
    {
        string Name { get; set; }
        string Surname { get; set; }
        string Email { get; set; }
        string Text { get; set; }
    }
}
