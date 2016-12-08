namespace SofthemeClassBooking_BOL.Contract.Models
{
    public interface IParticipant
    {
         int Id { get; set; }
         string Name { get; set; }
         int EventId { get; set; }
    }
}
