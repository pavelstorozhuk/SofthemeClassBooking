using System.Collections.Generic;
using SofthemeClassBooking_BOL.Contract.Models;

namespace SofthemeClassBooking_BOL.Contract.Services
{
    public interface IFeedbackService<TModel>
        where TModel : IFeedback
    {
        void Add(TModel feedback);
        IEnumerable<TModel> Get();
    }
}
