using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SofthemeClassBooking_BOL.Models;

namespace SofthemeClassBooking.Controllers
{
    public class EventController : Controller
    {
        // GET: Event
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Authorize]
        public ActionResult Create()
        {
            return PartialView();
        }

        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        public ActionResult Create(object eventModel)
        {

            var bla = eventModel;



            return Json(new {message = "good"});
        }

    }
}