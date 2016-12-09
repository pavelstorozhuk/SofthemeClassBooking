using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SofthemeClassBooking_BOL.Contract.Models;

namespace SofthemeClassBooking_BOL.Models
{
    public class EventModel : IEvent
    {
        public DateTime BeginingDate { get; set; }

        public int ClassRoomId { get; set; }

        public string Description { get; set; }

        public DateTime EndingDate { get; set; }

        public int Id { get; set; }

        public bool? IsAuthorShown { get; set; }

        public bool? IsPublic { get; set; }

        public string Organizer { get; set; }

        public string Title { get; set; }

        public string UserId { get; set; }
    }
}
