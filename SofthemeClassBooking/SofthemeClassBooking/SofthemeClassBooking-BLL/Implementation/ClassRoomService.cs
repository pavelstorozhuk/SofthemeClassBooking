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
        public void Add(ClassRoom classRoom)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ClassRoom> GetAll()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ClassRoom> GetMany(Expression<Func<ClassRoom, bool>> where)
        {
            throw new NotImplementedException();
        }

        public void Remove(ClassRoom classRoom)
        {
            throw new NotImplementedException();
        }

        public void Update(ClassRoom classRoom)
        {
            throw new NotImplementedException();
        }
    }
}
