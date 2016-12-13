using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SofthemeClassBooking_BOL.Contract.Models;

namespace SofthemeClassBooking_BOL.Models
{
    public class ParicipantModel : IParticipant
    {
        public int EventId { get; set; }
        public int Id { get; set; }

        [StringLength(256)]
        public string Email { get; set; }

    }
}
