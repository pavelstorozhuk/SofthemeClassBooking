using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SofthemeClassBooking.Controllers
{
    public class RoomEventController : Controller
    {
        // GET: Event
        public ActionResult Index()
        {
            return PartialView();
        }
    }
}