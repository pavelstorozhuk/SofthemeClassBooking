using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using SofthemeClassBooking_BLL.Contracts;
using SofthemeClassBooking_DAL;

namespace SofthemeClassBooking_BLL.Implementation
{
    public class EventService : IEventService
    {
        public void Add(Event classRoom)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Event> GetAll()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Event> GetMany(Expression<Func<Event, bool>> where)
        {
            throw new NotImplementedException();
        }

        public void Remove(Event classRoom)
        {
            throw new NotImplementedException();
        }

        public void Update(Event classRoom)
        {
            throw new NotImplementedException();
        }
    }
}
