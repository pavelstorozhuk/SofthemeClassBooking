using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SofthemeClassBooking.Startup))]
namespace SofthemeClassBooking
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
