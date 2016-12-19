namespace SofthemeClassBooking_BOL.Contract.Models
{
    public interface IParticipant
    {
         int Id { get; set; }
         string Email { get; set; }
         int EventId { get; set; }
    }
}
