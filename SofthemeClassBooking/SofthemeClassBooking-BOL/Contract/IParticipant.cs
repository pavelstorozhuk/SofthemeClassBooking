using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SofthemeClassBooking_BOL.Contract
{
    public interface IParticipant
    {
         int Id { get; set; }
         string Name { get; set; }
         int EventId { get; set; }
         IEvent Events { get; set; }
    }
}
