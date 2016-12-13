using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SofthemeClassBooking_BOL.Contract.Models;
using SofthemeClassBooking_BOL.Models;

namespace SofthemeClassBooking.Models
{
    public class EventInfoViewModel
    {
        public IEvent Event { get; set; }
        public int ParticipantCount { get; set; }
    }
}