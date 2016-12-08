using SofthemeClassBooking_BOL.Contract.Models;
using System.ComponentModel.DataAnnotations;

namespace SofthemeClassBooking_BOL.Models
{
    public class ClassRoomModel : IClassRoom
    {

        public int Id { get; set; }

        [Required]
        public byte Capacity { get; set; }

        [Required]
        public bool IsLocked { get; set; }

        [Required]
        [StringLength(30)]
        public string Name { get; set; }

        [Required]
        public byte QuantityOfBoards { get; set; }

        [Required]
        public byte QuantityOfLaptops { get; set; }

        [Required]
        public byte QuantityOfPrinters { get; set; }

        [Required]
        public byte QuantityOfTables { get; set; }

    }
}
