using System.Collections.Generic;
using SofthemeClassBooking_DAL;

namespace SofthemeClassBooking_BLL.Contracts
{
    interface IFeedbackServices
    {
        void Add();
        IEnumerable<Feedback> GetAll();
    }
}
