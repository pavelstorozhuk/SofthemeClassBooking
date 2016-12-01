using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SofthemeClassBooking_BOL.Contract
{
    public interface IEvent
    {
         int Id { get; set; }

         string Title { get; set; }

         string UserId { get; set; }

         int ClassRoomId { get; set; }

         string Organizer { get; set; }

         DateTime BeginingDate { get; set; }

         DateTime EndingDate { get; set; }

         string Description { get; set; }

         bool? IsPublic { get; set; }

         bool? IsAuthorShown { get; set; }

         IAspNetUser AspNetUsers { get; set; }

         IClassRoom ClassRooms { get; set; }

         ICollection<IParticipant> Participants { get; set; }
    }
}
