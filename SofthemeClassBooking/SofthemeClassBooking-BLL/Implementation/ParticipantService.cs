using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using SofthemeClassBooking_BLL.Contracts;
using SofthemeClassBooking_DAL;

namespace SofthemeClassBooking_BLL.Implementation
{
    public class ParticipantService : IParticipantService
    {
        public void Add(Participants classRoom)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Participants> GetAll()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Participants> GetMany(Expression<Func<Participants, bool>> where)
        {
            throw new NotImplementedException();
        }

        public void Remove(Participants classRoom)
        {
            throw new NotImplementedException();
        }

        public void Update(Participants classRoom)
        {
            throw new NotImplementedException();
        }
    }
}
