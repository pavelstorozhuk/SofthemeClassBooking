﻿using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using PagedList;
using SofthemeClassBooking.Models;
using SofthemeClassBooking_BLL.Implementation;
using SofthemeClassBooking_BOL.Contract.Models;
using SofthemeClassBooking_BOL.Contract.Services;

namespace SofthemeClassBooking.Controllers
{
    [Authorize]
    public class ManageController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
         private IEventService<IEvent> _eventService;

         public ManageController(IEventService<IEvent> eventService)
        {
            _eventService = eventService;
        }

        public ManageController(ApplicationUserManager userManager, ApplicationSignInManager signInManager, IEventService<IEvent> eventService)
        {
            UserManager = userManager;
            SignInManager = signInManager;
            _eventService = eventService;
        }

        public ApplicationSignInManager SignInManager
        {
            get { return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>(); }
            private set { _signInManager = value; }
        }

        public ApplicationUserManager UserManager
        {
            get { return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>(); }
            private set { _userManager = value; }
        }

        //
        // GET: /Manage/Index
        [Authorize(Roles = "admin")]
        public ActionResult Index(UserSearchModel model)
        {


            int pageSize = 20;
            int pageNumber = (model.Page ?? 1);
            model.SearchResults = UserManager.Users.ToList().ToPagedList(pageNumber, pageSize);
            return View("~/Views/Home/UserList.cshtml", model);


        }
        [Authorize(Roles = "admin")]
        public ActionResult Search(UserSearchModel model)
        {
            if (model.SearchButton != null)
            {
                int pageSize = 20;
                int pageNumber = 1;
                var result = UserManager.Users.ToList()
                    .Where(p => p.UserName.StartsWith(model.SearchButton)).OrderBy(p => p.UserName);
                model.SearchResults = result.ToList().ToPagedList(pageNumber, pageSize);
                return View("~/Views/Home/UserList.cshtml", model);
            }
            return Index(new UserSearchModel { Page = 1 });

        }

        [Authorize(Roles = "admin")]
        
        public int GetNumberOfEventsByUser(string id)
        {
            return _eventService.GetByUser(id).Count();
        }
        //
        // POST: /Manage/RemoveLogin
        [Authorize(Roles = "admin")]
        [HttpPost]

        public async Task<ActionResult> RemoveLogin(string userId)
        {


            ManageMessageId? message;
            string loginProvider = string.Empty;
            string providerKey = string.Empty;
            var result =
                await
                    UserManager.RemoveLoginAsync(userId,
                        new UserLoginInfo(loginProvider, providerKey));

            if (result.Succeeded)
            {
                var user = await UserManager.FindByIdAsync(userId);
                if (user != null)
                {
                    _eventService.RemoveAllEventsFromUser(user.Id);
                    
                    result = await UserManager.DeleteAsync(user);
                    message = ManageMessageId.RemoveLoginSuccess;
                }
                else
                {
                    message = ManageMessageId.Error;
                }

            }
            else
            {

                message = ManageMessageId.Error;

            }
            return RedirectToAction("Index", "Manage", new { Message = message });
        }

        //
        // GET: /Manage/AddPhoneNumber
        public ActionResult AddPhoneNumber()
        {
            return View();
        }

        //
        // POST: /Manage/AddPhoneNumber
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> AddPhoneNumber(AddPhoneNumberViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            // Generate the token and send it
            var code = await UserManager.GenerateChangePhoneNumberTokenAsync(User.Identity.GetUserId(), model.Number);
            if (UserManager.SmsService != null)
            {
                var message = new IdentityMessage
                {
                    Destination = model.Number,
                    Body = "Your security code is: " + code
                };
                await UserManager.SmsService.SendAsync(message);
            }
            return RedirectToAction("VerifyPhoneNumber", new { PhoneNumber = model.Number });
        }

        //
        // POST: /Manage/EnableTwoFactorAuthentication
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> EnableTwoFactorAuthentication()
        {
            await UserManager.SetTwoFactorEnabledAsync(User.Identity.GetUserId(), true);
            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            if (user != null)
            {
                await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
            }
            return RedirectToAction("Index", "Manage");
        }

        //
        // POST: /Manage/DisableTwoFactorAuthentication
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DisableTwoFactorAuthentication()
        {
            await UserManager.SetTwoFactorEnabledAsync(User.Identity.GetUserId(), false);
            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            if (user != null)
            {
                await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
            }
            return RedirectToAction("Index", "Manage");
        }

        //
        // GET: /Manage/VerifyPhoneNumber
        public async Task<ActionResult> VerifyPhoneNumber(string phoneNumber)
        {
            var code = await UserManager.GenerateChangePhoneNumberTokenAsync(User.Identity.GetUserId(), phoneNumber);
            // Send an SMS through the SMS provider to verify the phone number
            return phoneNumber == null
                ? View("Error")
                : View(new VerifyPhoneNumberViewModel { PhoneNumber = phoneNumber });
        }

        //
        // POST: /Manage/VerifyPhoneNumber
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> VerifyPhoneNumber(VerifyPhoneNumberViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var result =
                await UserManager.ChangePhoneNumberAsync(User.Identity.GetUserId(), model.PhoneNumber, model.Code);
            if (result.Succeeded)
            {
                var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
                if (user != null)
                {
                    await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                }
                return RedirectToAction("Index", new { Message = ManageMessageId.AddPhoneSuccess });
            }
            // If we got this far, something failed, redisplay form
            ModelState.AddModelError("", "Failed to verify phone");
            return View(model);
        }

        //
        // GET: /Manage/RemovePhoneNumber
        public async Task<ActionResult> RemovePhoneNumber()
        {
            var result = await UserManager.SetPhoneNumberAsync(User.Identity.GetUserId(), null);
            if (!result.Succeeded)
            {
                return RedirectToAction("Index", new { Message = ManageMessageId.Error });
            }
            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            if (user != null)
            {
                await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
            }
            return RedirectToAction("Index", new { Message = ManageMessageId.RemovePhoneSuccess });
        }

        //
        // GET: /Manage/ChangePassword
        public ActionResult ChangePassword()
        {
            return View();
        }

        [Authorize]
        public async Task<ActionResult> ChangeUserNameEmail()
        {
            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            if (user != null)
            {
                string email = user.Email;
                string name = user.UserName;

                bool isAdmin = UserManager.IsInRole(user.Id, "admin");
                return PartialView("~/Views/Home/ChangeUserNameEmail.cshtml",
                    new ChangeUserNameEmail() { Email = email, UserName = name, IsAdmin = isAdmin });
            }
            else throw new Exception("message");
        }
        [Authorize]
        public async Task<IdentityResult> EditRole(ApplicationUser user, string role)
        {
            if (user != null || role != null)
            {
                var oldUser = await UserManager.FindByIdAsync(user.Id);
                var oldRole = UserManager.GetRoles(oldUser.Id).FirstOrDefault();


                if (oldRole != role)
                {
                    UserManager.RemoveFromRole(user.Id, oldRole);
                    UserManager.AddToRole(user.Id, role);
                }


            }
            else return IdentityResult.Failed();

            return await UserManager.UpdateAsync(user);

        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public async Task<ActionResult> SaveChangeUserNameEmail(ChangeUserNameEmail model)
        {
            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());


            if (user != null && model != null)
            {
                user.Email = model.Email;
                user.UserName = model.UserName;
                if (model.IsAdmin)
                {
                    await EditRole(user, "admin");
                }
                else
                {

                    var oldRole = UserManager.GetRoles(user.Id).FirstOrDefault();
                    string newRole = String.Empty;
                    if (model.IsAdmin)
                    {
                        newRole = "admin";
                    }
                    else newRole = "user";

                    if (oldRole != newRole)
                    {
                        UserManager.RemoveFromRole(user.Id, oldRole);
                        UserManager.AddToRole(user.Id, newRole);
                    }

                }
                var result = UserManager.Update(user);
                if (result.Succeeded)
                {
                    await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                    return RedirectToAction("Index", "Home");
                }

            }

            return View("~/Views/Home/Profile.cshtml");


        }


        //
        // POST: /Manage/ChangePassword
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public async Task<ActionResult> ChangePasswordFromUserProfile(ChangePasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View("~/Views/Home/Profile.cshtml", model);
            }
            var result = await UserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword, model.NewPassword);
            if (result.Succeeded)
            {
                var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
                if (user != null)
                {
                    await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                    ViewData["ChangePasswordSuccess"] = "Success";
                }
                return View("~/Views/Home/Profile.cshtml", model);
            }
            AddErrors(result);
            return View("~/Views/Home/Profile.cshtml", model);


        }
        /* public async Task<ActionResult> ChangePassword(ChangePasswordViewModel model)
         {
             if (!ModelState.IsValid)
             {
                 return View(model);
             }
             var result = await UserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword, model.NewPassword);
             if (result.Succeeded)
             {
                 var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
                 if (user != null)
                 {
                     await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                 }
                 return RedirectToAction("Index", new { Message = ManageMessageId.ChangePasswordSuccess });
             }
             AddErrors(result);
             return View(model);
         }
         */
        //
        // GET: /Manage/SetPassword
        public ActionResult SetPassword()
        {
            return View();
        }

        //
        // POST: /Manage/SetPassword
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> SetPassword(SetPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await UserManager.AddPasswordAsync(User.Identity.GetUserId(), model.NewPassword);
                if (result.Succeeded)
                {
                    var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
                    if (user != null)
                    {
                        await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                    }
                    return RedirectToAction("Index", new { Message = ManageMessageId.SetPasswordSuccess });
                }
                AddErrors(result);
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }


        [Authorize(Roles = "admin")]
        public ActionResult UserList(UserSearchModel model)
        {
            int pageSize = 20;
            int pageNumber = (model.Page ?? 1);
            model.SearchResults = UserManager.Users.ToList().ToPagedList(pageNumber, pageSize);
            return View("~/Views/Home/UserList.cshtml", model);
        }
        //
        // GET: /Manage/ManageLogins
        public async Task<ActionResult> ManageLogins(ManageMessageId? message)
        {
            ViewBag.StatusMessage =
                message == ManageMessageId.RemoveLoginSuccess ? "The external login was removed."
                : message == ManageMessageId.Error ? "An error has occurred."
                : "";
            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            if (user == null)
            {
                return View("Error");
            }
            var userLogins = await UserManager.GetLoginsAsync(User.Identity.GetUserId());
            var otherLogins = AuthenticationManager.GetExternalAuthenticationTypes().Where(auth => userLogins.All(ul => auth.AuthenticationType != ul.LoginProvider)).ToList();
            ViewBag.ShowRemoveButton = user.PasswordHash != null || userLogins.Count > 1;
            return View(new ManageLoginsViewModel
            {
                CurrentLogins = userLogins,
                OtherLogins = otherLogins
            });
        }

        //
        // POST: /Manage/LinkLogin
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LinkLogin(string provider)
        {
            // Request a redirect to the external login provider to link a login for the current user
            return new AccountController.ChallengeResult(provider, Url.Action("LinkLoginCallback", "Manage"), User.Identity.GetUserId());
        }

        //
        // GET: /Manage/LinkLoginCallback
        public async Task<ActionResult> LinkLoginCallback()
        {
            var loginInfo = await AuthenticationManager.GetExternalLoginInfoAsync(XsrfKey, User.Identity.GetUserId());
            if (loginInfo == null)
            {
                return RedirectToAction("ManageLogins", new { Message = ManageMessageId.Error });
            }
            var result = await UserManager.AddLoginAsync(User.Identity.GetUserId(), loginInfo.Login);
            return result.Succeeded ? RedirectToAction("ManageLogins") : RedirectToAction("ManageLogins", new { Message = ManageMessageId.Error });
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing && _userManager != null)
            {
                _userManager.Dispose();
                _userManager = null;
            }

            base.Dispose(disposing);
        }

        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        private bool HasPassword()
        {
            var user = UserManager.FindById(User.Identity.GetUserId());
            if (user != null)
            {
                return user.PasswordHash != null;
            }
            return false;
        }

        private bool HasPhoneNumber()
        {
            var user = UserManager.FindById(User.Identity.GetUserId());
            if (user != null)
            {
                return user.PhoneNumber != null;
            }
            return false;
        }

        public enum ManageMessageId
        {
            AddPhoneSuccess,
            ChangePasswordSuccess,
            SetTwoFactorSuccess,
            SetPasswordSuccess,
            RemoveLoginSuccess,
            RemovePhoneSuccess,
            Error
        }

        #endregion
    }
}