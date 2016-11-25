using System;
using System.Collections.Generic;
using SofthemeClassBooking_BLL.Contracts;
using SofthemeClassBooking_DAL;
using SofthemeClassBooking_BLL.Entities.Contract;

namespace SofthemeClassBooking_BLL.Implementation
{
    public class FeedbackService : IFeedbackService
    {
        public void Add(IFeedbackEntity feedbackEntity)
        {
            using (var context = new ClassBookingContext())
            {
                context.Feedbacks.Add(Map(feedbackEntity));
                context.SaveChanges();
            }
        }

        public IEnumerable<IFeedbackEntity> GetAll()
        {
            throw new NotImplementedException();
        }

        private Feedbacks Map(IFeedbackEntity feedbackEntity)
        {
            return new Feedbacks
            {
                Name = feedbackEntity.Name,
                Email = feedbackEntity.Email,
                Surname = feedbackEntity.Surname,
                Text = feedbackEntity.Message
            };
        }
    }
}
