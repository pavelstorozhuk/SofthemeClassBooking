using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SofthemeClassBooking_BOL.Contract
{
    public interface IClassRoom
    {
       int Id { get; set; }

        string Name { get; set; }

         byte Capacity { get; set; }

         byte QuantityOfBoards { get; set; }

         byte QuantityOfPrinters { get; set; }

         byte QuantityOfTables { get; set; }

         byte QuantityOfLaptops { get; set; }

         bool IsLocked { get; set; }
    }
}
