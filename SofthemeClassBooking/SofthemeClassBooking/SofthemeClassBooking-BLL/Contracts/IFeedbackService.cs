using System.Collections.Generic;
using SofthemeClassBooking_BLL.Entities.Contract;
using SofthemeClassBooking_DAL;

namespace SofthemeClassBooking_BLL.Contracts
{
    public interface IFeedbackService
    {
        void Add(IFeedbackEntity feedback);
        IEnumerable<IFeedbackEntity> GetAll();
    }
}
