using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SofthemeClassBooking_BOL.Contract.Services;
using SofthemeClassBooking_BOL.Models;

namespace SofthemeClassBooking.Controllers
{
    public class ParticipantController : Controller
    {
        private IParticipantService<ParicipantModel> _participantService;

        public ParticipantController(IParticipantService<ParicipantModel> participantService)
        {
            _participantService = participantService;
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Add(ParicipantModel paricipantModel)
        {
            _participantService.Add(paricipantModel);
            return Json(new {message = "ok"});
        }
    }
}