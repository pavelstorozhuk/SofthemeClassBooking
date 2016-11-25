using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using SofthemeClassBooking_BLL.Contracts;
using SofthemeClassBooking_DAL;


namespace SofthemeClassBooking_BLL.Implementation
{
    public class ClassRoomService : IClassRoomService
    {
        public void Add(ClassRooms classRoom)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ClassRooms> GetAll()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ClassRooms> GetMany(Expression<Func<ClassRooms, bool>> where)
        {
            throw new NotImplementedException();
        }

        public void Remove(ClassRooms classRoom)
        {
            throw new NotImplementedException();
        }

        public void Update(ClassRooms classRoom)
        {
            throw new NotImplementedException();
        }
    }
}
