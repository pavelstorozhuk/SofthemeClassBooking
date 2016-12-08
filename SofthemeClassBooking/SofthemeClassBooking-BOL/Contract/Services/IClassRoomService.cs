﻿using SofthemeClassBooking_BOL.Contract.Models;
using SofthemeClassBooking_BOL.Enum;

namespace SofthemeClassBooking_BOL.Contract.Services
{
    public interface IClassRoomService<TModel> : IService<TModel> 
        where TModel: IClassRoom 
    {
        TModel Get(int id);
        void ChangeRoomStatus(int id, ClassRoomStatus classRoomStatus);
    }
}