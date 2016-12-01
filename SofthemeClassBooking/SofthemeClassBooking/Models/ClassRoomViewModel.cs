using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SofthemeClassBooking_BOL.Contract;

namespace SofthemeClassBooking.Models
{
    public class ClassRoomViewModel : IClassRoom
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public byte Capacity { get; set; }

        public byte QuantityOfBoards { get; set; }

        public byte QuantityOfPrinters { get; set; }

        public byte QuantityOfTables { get; set; }

        public byte QuantityOfLaptops { get; set; }

        public bool IsLocked { get; set; }
    }
}