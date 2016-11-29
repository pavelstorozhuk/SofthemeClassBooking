using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SofthemeClassBooking_BOL.Contract;

namespace SofthemeClassBooking.Models
{
    public class ClassRoomAdditionalViewModel
    {
        public IClassRoom ClassRoom { get; set; }
        public bool IsChange { get; set; }
    }
}