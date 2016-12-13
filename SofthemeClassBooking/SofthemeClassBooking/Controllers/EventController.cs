using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using SofthemeClassBooking.Models;
using SofthemeClassBooking_BOL.Contract.Services;
using SofthemeClassBooking_BOL.Models;

namespace SofthemeClassBooking.Controllers
{
    public class EventController : Controller
    {
        private IEventService<EventModel> _eventService;
        private IParticipantService<ParicipantModel> _participantService;

        public EventController(
            IEventService<EventModel> eventService, 
            IParticipantService<ParicipantModel> participantService)
        {
            _eventService = eventService;
            _participantService = participantService;

        }

        public ActionResult Brief()
        {
            var eventsBriefJson = JsonConvert.SerializeObject(_eventService.GetBrief(), Formatting.None, new IsoDateTimeConverter() { DateTimeFormat = "yyyy-MM-dd-HH-mm-ss" });
            return Json(eventsBriefJson, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Index(int id)
        {
            var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(ApplicationDbContext.Create()));
            var eventInfo = _eventService.Get(id);
            eventInfo.Id = id;

            return View(new EventViewModel
            {
                Event = eventInfo,
                ParticipantCount = _participantService.GetCount(id),
                Author = userManager.FindById(eventInfo.UserId).UserName
            });

        }

        public ActionResult InfoVerbose(int id)
        {
            var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(ApplicationDbContext.Create()));
            var eventInfo = _eventService.Get(id);
            eventInfo.Id = id;

            return PartialView(new EventViewModel
            {
                Event = eventInfo,
                ParticipantCount = _participantService.GetCount(id),
                Author = userManager.FindById(eventInfo.UserId).UserName
            });
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
                try
                {
                    _eventService.Add(eventModel);
                }
                catch (InvalidOperationException)
                {
                    return Json(new {message = WebConfigurationManager.AppSettings["RoomIsBusy"], success = false});
                }
                catch (Exception)
                {
                    return Json(new { message = WebConfigurationManager.AppSettings["GeneralException"] , success = false });
                }
            }

            return Json(new {message = WebConfigurationManager.AppSettings["EventAddedSuccess"], success = true });
        }

    }
}