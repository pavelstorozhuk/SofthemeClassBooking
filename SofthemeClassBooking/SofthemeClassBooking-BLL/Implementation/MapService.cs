﻿using SofthemeClassBooking_BOL.Models;
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

        public static Events Map(EventModel feedbackModel)
        {
            return new Events
            {
                Title = feedbackModel.Title,
                UserId = feedbackModel.UserId,
                ClassRoomId = feedbackModel.ClassRoomId,
                Organizer = feedbackModel.Organizer,
                BeginingDate = feedbackModel.BeginingDate,
                EndingDate = feedbackModel.EndingDate,
                Description = feedbackModel.Description,
                IsPrivate = feedbackModel.IsPrivate,
                IsAuthorShown = feedbackModel.IsAuthorShown,
                IsParticipantsAllowed = feedbackModel.IsParticipantsAllowed
            };
        }

        public static EventModel Map(Events events)
        {
            return new EventModel
            {
                Title = events.Title,
                UserId = events.UserId,
                ClassRoomId = events.ClassRoomId,
                Organizer = events.Organizer,
                BeginingDate = events.BeginingDate,
                EndingDate = events.EndingDate,
                Description = events.Description,
                IsPrivate = events.IsPrivate,
                IsAuthorShown = events.IsAuthorShown,
                IsParticipantsAllowed = events.IsParticipantsAllowed
            };
        }

        public static ParicipantModel Map(Participants participants)
        {
            return new ParicipantModel
            {
                Id = participants.Id,
                EventId = participants.Id,
                Email = participants.Email
            };
        }

        public static Participants Map(ParicipantModel paricipantModel)
        {
            return new Participants
            {
                Id = paricipantModel.Id,
                EventId = paricipantModel.Id,
                Email = paricipantModel.Email
            };
        }
    }

}
