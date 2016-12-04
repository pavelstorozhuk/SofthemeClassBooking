using SofthemeClassBooking_BOL.Models;
using SofthemeClassBooking_DAL;

namespace SofthemeClassBooking_BLL.Implementation
{
    public static class MapService
    {
        public static ClassRoomModel Map(ClassRooms classRooms)
        {
            return new ClassRoomModel
            {
                Id = classRooms.Id,
                Capacity = classRooms.Capacity,
                IsLocked = classRooms.IsLocked,
                Name = classRooms.Name,
                QuantityOfBoards = classRooms.QuantityOfBoards,
                QuantityOfLaptops = classRooms.QuantityOfLaptops,
                QuantityOfPrinters = classRooms.QuantityOfPrinters,
                QuantityOfTables = classRooms.QuantityOfTables
            };
        }

        public static ClassRooms Map(ClassRoomModel classRoomModel)
        {
            return new ClassRooms
            {
                Id = classRoomModel.Id,
                Capacity = classRoomModel.Capacity,
                IsLocked = classRoomModel.IsLocked,
                Name = classRoomModel.Name,
                QuantityOfBoards = classRoomModel.QuantityOfBoards,
                QuantityOfLaptops = classRoomModel.QuantityOfLaptops,
                QuantityOfPrinters = classRoomModel.QuantityOfPrinters,
                QuantityOfTables = classRoomModel.QuantityOfTables
            };
        }


        public static Feedbacks Map(FeedbackModel feedbackModel)
        {
            return new Feedbacks
            {
                Name = feedbackModel.Name,
                Email = feedbackModel.Email,
                Surname = feedbackModel.Surname,
                Text = feedbackModel.Text
            };
        }
    }
}
