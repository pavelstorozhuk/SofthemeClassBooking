using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using SofthemeClassBooking_BLL.Contracts;
using SofthemeClassBooking_BOL;
using SofthemeClassBooking_BOL.Contract;
using SofthemeClassBooking_DAL;


namespace SofthemeClassBooking_BLL.Implementation
{
    public class ClassRoomService : IClassRoomService
    {

        public void Add(IClassRoom classRoom)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<IClassRoom> GetAll()
        {
            var classRoomModel = new List<IClassRoom>();

            using (var context = new ClassBookingContext())
            {
                var classRoomDTO = context.ClassRooms.ToList();
                foreach (var classRoom in classRoomDTO)
                {
                    classRoomModel.Add(Map(classRoom));
                }
            }
            return classRoomModel;
        }

        private ClassRoomModel Map(ClassRooms classRoomDTO)
        {
            return new ClassRoomModel
            {
                Id = classRoomDTO.Id,
                Capacity = classRoomDTO.Capacity,
                IsLocked = classRoomDTO.IsLocked,
                Name = classRoomDTO.Name,
                QuantityOfBoards = classRoomDTO.QuantityOfBoards,
                QuantityOfLaptops = classRoomDTO.QuantityOfLaptops,
                QuantityOfPrinters = classRoomDTO.QuantityOfPrinters,
                QuantityOfTables = classRoomDTO.QuantityOfTables
            };
        }

        public IEnumerable<IClassRoom> GetMany(Expression<Func<IClassRoom, bool>> where)
        {
            throw new NotImplementedException();
        }

        public void Remove(IClassRoom classRoom)
        {
            throw new NotImplementedException();
        }

        public void Update(IClassRoom classRoom)
        {
            throw new NotImplementedException();
        }

        public IClassRoom GetById(int id)
        {
            using (var context = new ClassBookingContext())
            {
                return Map(context.ClassRooms.Find(id));
            }
        }

    }
}
