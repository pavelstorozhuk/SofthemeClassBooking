using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SofthemeClassBooking.Models;

namespace SofthemeClassBooking.Controllers
{
    public class FeedbackController : Controller
    {



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
                return Json(new { message = "Спасибо. Ваше сообщение отправлено администратору." });
            }

            return Json( new {message = "Данные введены неверно. Попробуйте еще раз."});
        }

    }
}