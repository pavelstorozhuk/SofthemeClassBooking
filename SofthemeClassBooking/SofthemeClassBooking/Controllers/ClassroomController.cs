using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SofthemeClassBooking.Models;
using SofthemeClassBooking_BLL.Contracts;
using SofthemeClassBooking_BLL.Enum;
using SofthemeClassBooking_BOL.Contract;
using SofthemeClassBooking_BOL;


namespace SofthemeClassBooking.Controllers
{
    public class ClassroomController : Controller
    {
        private IClassRoomService _classRoomService;
        // GET: Classroom
        public ClassroomController(IClassRoomService classRoomService)
        {
            _classRoomService = classRoomService;
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult Index()
        {
            return PartialView(_classRoomService.GetAll());
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult AdditionalInfo(int id, bool isChange = false)
        {
            var classRoomInfo = new ClassRoomAdditionalViewModel()
            {
                ClassRoom = _classRoomService.GetById(id),
                IsChange = isChange
            };
            return PartialView(classRoomInfo);
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult AdditionalInfo(ClassRoomAdditionalViewModel classRoomAdditional)
        {
            return PartialView("AdditionalInfo", classRoomAdditional);
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult RoomPage(int id)
        {

            return View(_classRoomService.GetById(id));
        }

        [HttpPost]
        //[Authorize(Roles = "Administrator")]
        public ActionResult ChangeInfo(ClassRoomModel classRoom)
        {
            if (ModelState.IsValid)
            {
                _classRoomService.Update(classRoom);
                return Json(new {success = true});
            }
            return Json(new { success = false });
        }

        [HttpPost]
        //[Authorize(Roles = "Administrator")]
        public ActionResult ChangeStatus(ClassRoomChangeStatusModel classRoomChangeStatusModel)
        {
            if (ModelState.IsValid)
            {
                _classRoomService.ChangeRoomStatus(classRoomChangeStatusModel.Id, (ClassRoomStatus)classRoomChangeStatusModel.ClassRoomStatus);
                return Json(new { success = true });
            }
            return Json(new { success = false });
        }
    }
}