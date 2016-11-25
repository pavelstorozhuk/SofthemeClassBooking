namespace SofthemeClassBooking_BLL.Entities.Contract
{
    public interface IFeedbackEntity
    {
        string Name { get; set; }
        string Surname { get; set; }
        string Email { get; set; }
        string Message { get; set; }
    }
}