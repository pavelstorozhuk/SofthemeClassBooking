namespace SofthemeClassBooking_BOL.Contract.Models
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
