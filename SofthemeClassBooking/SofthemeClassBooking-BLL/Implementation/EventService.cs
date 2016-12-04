using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using SofthemeClassBooking_BOL.Contract.Services;
using SofthemeClassBooking_BOL.Models;
using SofthemeClassBooking_DAL;

namespace SofthemeClassBooking_BLL.Implementation
{
    public class EventService : IEventService<EventModel>
    {
        public void Add(EventModel classRoom)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<EventModel> Get()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<EventModel> Get(Expression<Func<EventModel, bool>> where)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<EventModel> GetM(Expression<Func<EventModel, bool>> where)
        {
            throw new NotImplementedException();
        }

        public void Remove(EventModel classRoom)
        {
            throw new NotImplementedException();
        }

        public void Update(EventModel classRoom)
        {
            throw new NotImplementedException();
        }
    }
}
