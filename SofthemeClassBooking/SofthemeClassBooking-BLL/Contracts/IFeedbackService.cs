using System.Collections.Generic;
using SofthemeClassBooking_BOL.Contract;
using SofthemeClassBooking_DAL;

namespace SofthemeClassBooking_BLL.Contracts
{
    public interface IFeedbackService
    {
        void Add(IFeedback feedback);
        IEnumerable<IFeedback> GetAll();
    }
}
