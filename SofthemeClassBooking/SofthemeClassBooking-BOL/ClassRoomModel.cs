using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SofthemeClassBooking_BOL.Contract;

namespace SofthemeClassBooking_BOL
{
    public class ClassRoomModel : IClassRoom
    {
        public byte Capacity { get; set; }
        public int Id { get; set; }
        public bool IsLocked { get; set; }
        public string Name { get; set; }
        public byte QuantityOfBoards { get; set; }
        public byte QuantityOfLaptops { get; set; }
        public byte QuantityOfPrinters { get; set; }
        public byte QuantityOfTables { get; set; }

    }
}
