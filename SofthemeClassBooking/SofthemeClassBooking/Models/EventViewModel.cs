using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SofthemeClassBooking_BOL.Contract.Models;

namespace SofthemeClassBooking.Models
{
    public class EventViewModel
    {
        public IEvent Event { get; set; }
        public IEnumerable<IParticipant> Participants { get; set; }
        public int ParticipantCount { get; set; }
        public string Author { get; set; }
    }
}