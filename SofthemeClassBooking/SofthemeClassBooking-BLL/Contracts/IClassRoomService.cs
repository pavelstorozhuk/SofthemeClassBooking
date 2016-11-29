using System.Collections;
using System.Collections.Generic;
using SofthemeClassBooking_BLL.Enum;
using SofthemeClassBooking_BOL.Contract;
using SofthemeClassBooking_DAL;

namespace SofthemeClassBooking_BLL.Contracts
{
    public interface IClassRoomService : IService<IClassRoom>
    {
        IClassRoom GetById(int id);
        void ChangeRoomStatus(int id, ClassRoomStatus classRoomStatus);
    }
}
