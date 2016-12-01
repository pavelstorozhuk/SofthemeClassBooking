using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using SofthemeClassBooking_BLL.Contracts;
using SofthemeClassBooking_DAL;

namespace SofthemeClassBooking_BLL.Implementation
{
    public class EventService : IEventService
    {
        public void Add(Events classRoom)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Events> GetAll()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Events> GetMany(Expression<Func<Events, bool>> where)
        {
            throw new NotImplementedException();
        }

        public void Remove(Events classRoom)
        {
            throw new NotImplementedException();
        }

        public void Update(Events classRoom)
        {
            throw new NotImplementedException();
        }
    }
}
