using System.ComponentModel.DataAnnotations;
using SofthemeClassBooking_BOL.Contract;

namespace SofthemeClassBooking.Models
{
    public class FeedbackModel : IFeedback
    {
        private const string DangerMessagePath = "<img src='../Content/images/danger.png'/> ";
        private const string ErrorEmptyMessage = DangerMessagePath + "Это поле обязательно для заполения";
        private const string ErrorMessageMaxLengthReached = DangerMessagePath + "Поле слишком длинное";
        private const string ErrorEmailMessage = DangerMessagePath + "Неверный адрес электронной почты";

        [Required(ErrorMessage = ErrorEmptyMessage)]
        [StringLength(50, ErrorMessage = ErrorMessageMaxLengthReached)]
        public string Name { get; set; }

        [Required(ErrorMessage = ErrorEmptyMessage)]
        [StringLength(50, ErrorMessage = ErrorMessageMaxLengthReached)]
        public string Surname { get; set; }

        [Required(ErrorMessage = ErrorEmptyMessage)]
        [RegularExpression(@"^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$", ErrorMessage = ErrorEmailMessage)]
        [StringLength(50, ErrorMessage = ErrorMessageMaxLengthReached)]
        public string Email { get; set; }

        [Required(ErrorMessage = ErrorEmptyMessage)]
        [StringLength(3000, ErrorMessage = ErrorMessageMaxLengthReached)]
        public string Text { get; set; }
    }
}