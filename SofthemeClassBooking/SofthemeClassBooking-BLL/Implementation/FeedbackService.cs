using System;
using System.Collections.Generic;
using SofthemeClassBooking_BLL.Contracts;
using SofthemeClassBooking_BOL.Contract;
using SofthemeClassBooking_DAL;

namespace SofthemeClassBooking_BLL.Implementation
{
    public class FeedbackService : IFeedbackService
    {
        public void Add(IFeedback feedbackEntity)
        {
            using (var context = new ClassBookingContext())
            {
                context.Feedbacks.Add(Map(feedbackEntity));
                context.SaveChanges();
            }
        }

        public IEnumerable<IFeedback> GetAll()
        {
            throw new NotImplementedException();
        }

        private Feedbacks Map(IFeedback feedback)
        {
            return new Feedbacks
            {
                Name = feedback.Name,
                Email = feedback.Email,
                Surname = feedback.Surname,
                Text = feedback.Text
            };
        }
    }
}
