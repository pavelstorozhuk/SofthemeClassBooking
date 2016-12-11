using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using SofthemeClassBooking_BOL.Contract.Services;
using SofthemeClassBooking_DAL;
using SofthemeClassBooking_BOL.Models;

namespace SofthemeClassBooking_BLL.Implementation
{
    public class ParticipantService : IParticipantService<ParicipantModel>
    {
        public void Add(ParicipantModel participaModel)
        {
            using (var context = new ClassBookingContext())
            {
                context.Participants.Add(MapService.Map(participaModel));
                context.SaveChanges();
            }
        }

        public IEnumerable<ParicipantModel> Get()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ParicipantModel> Get(Expression<Func<ParicipantModel, bool>> where)
        {
            throw new NotImplementedException();
        }

        public void Remove(ParicipantModel classRoom)
        {
            throw new NotImplementedException();
        }

        public void Update(ParicipantModel classRoom)
        {
            throw new NotImplementedException();
        }
    }
}
