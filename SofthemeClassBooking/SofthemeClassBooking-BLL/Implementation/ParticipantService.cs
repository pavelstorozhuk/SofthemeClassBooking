using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using SofthemeClassBooking_BLL.Contracts;
using SofthemeClassBooking_DAL;

namespace SofthemeClassBooking_BLL.Implementation
{
    public class ParticipantService : IParticipantService
    {
        public void Add(Participant classRoom)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Participant> GetAll()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Participant> GetMany(Expression<Func<Participant, bool>> where)
        {
            throw new NotImplementedException();
        }

        public void Remove(Participant classRoom)
        {
            throw new NotImplementedException();
        }

        public void Update(Participant classRoom)
        {
            throw new NotImplementedException();
        }
    }
}
