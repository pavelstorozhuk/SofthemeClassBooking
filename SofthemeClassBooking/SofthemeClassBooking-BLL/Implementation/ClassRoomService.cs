using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using SofthemeClassBooking_BLL.Contracts;
using SofthemeClassBooking_BLL.Enum;
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

        private ClassRooms Map(IClassRoom classRoom)
        {
            return new ClassRooms
            {
                Id = classRoom.Id,
                Capacity = classRoom.Capacity,
                IsLocked = classRoom.IsLocked,
                Name = classRoom.Name,
                QuantityOfBoards = classRoom.QuantityOfBoards,
                QuantityOfLaptops = classRoom.QuantityOfLaptops,
                QuantityOfPrinters = classRoom.QuantityOfPrinters,
                QuantityOfTables = classRoom.QuantityOfTables
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
        /*
         db.Users.Attach(updatedUser);
var entry = db.Entry(updatedUser);
entry.Property(e => e.Email).IsModified = true;
// other changed properties
db.SaveChanges();
*/
        public void Update(IClassRoom classRoom)
        {
            var updatedClassRoom = Map(classRoom);

            using (var context = new ClassBookingContext())
            {
                var old = context.ClassRooms.FirstOrDefault(c => c.Id == updatedClassRoom.Id);
                if (old != null)
                {
                    context.Entry(old).CurrentValues.SetValues(updatedClassRoom);
                    context.SaveChanges();
                }
                else
                {
                    throw new ObjectNotFoundException();
                }
            }
        }

        public IClassRoom GetById(int id)
        {
            using (var context = new ClassBookingContext())
            {
                return Map(context.ClassRooms.Find(id));
            }
        }

        public void ChangeRoomStatus(int id, ClassRoomStatus classRoomStatus)
        {
            using (var context = new ClassBookingContext())
            {
                var classRoom = context.ClassRooms.Find(id);
                context.ClassRooms.Attach(classRoom);
                var entry = context.Entry(classRoom);
                switch (classRoomStatus)
                {
                    case ClassRoomStatus.Opened:
                        classRoom.IsLocked = false;
                        break;

                    case ClassRoomStatus.Closed:
                        classRoom.IsLocked = true;
                        break;
                }
                entry.Property(e => e.IsLocked).IsModified = true;
                context.SaveChanges();
            }
        }
    }
}
