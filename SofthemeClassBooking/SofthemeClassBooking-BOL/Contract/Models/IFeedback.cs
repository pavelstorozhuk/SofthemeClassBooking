namespace SofthemeClassBooking_BOL.Contract.Models
{
    public interface IFeedback
    {
        string Name { get; set; }
        string Surname { get; set; }
        string Email { get; set; }
        string Text { get; set; }
    }
}
