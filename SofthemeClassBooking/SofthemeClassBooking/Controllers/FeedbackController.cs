using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SofthemeClassBooking.Models;
using SofthemeClassBooking_BLL.Contracts;
using SofthemeClassBooking_BLL.Implementation;

namespace SofthemeClassBooking.Controllers
{
    public class FeedbackController : Controller
    {
        private IFeedbackService _feedbackService;

        public FeedbackController(IFeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Send(FeedbackModel feedback)
        {

            if (ModelState.IsValid)
            {
                _feedbackService.Add(feedback);
                return Json(new { message = "Спасибо. Ваше сообщение отправлено администратору." });
            }

            return Json( new {message = "Данные введены неверно. Попробуйте еще раз."});
        }

    }
}