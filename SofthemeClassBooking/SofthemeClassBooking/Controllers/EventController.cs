using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using SofthemeClassBooking_BOL.Contract.Services;
using SofthemeClassBooking_BOL.Models;

namespace SofthemeClassBooking.Controllers
{
    public class EventController : Controller
    {
        private IEventService<EventModel> _eventService;
        private IParticipantService<ParicipantModel> _participantService;

        public EventController(IEventService<EventModel> eventService, IParticipantService<ParicipantModel> participantService)
        {
            _eventService = eventService;
            _participantService = participantService;
        }

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
        public ActionResult Create(EventModel eventModel)
        {
            eventModel.UserId = User.Identity.GetUserId();

            if (ModelState.IsValid)
            {
                //get events from selected room
                //check it
                //if all is OK, save event
                _eventService.Add(eventModel);
            }
            return Json(new {message = "good"});
        }

    }
}