using System.Web;
using System.Web.Optimization;

namespace SofthemeClassBooking
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            #region Script
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/validation/jquery.validate*",
                        "~/Scripts/validation/feedback-validation.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap/bootstrap.js",
                      "~/Scripts/bootstrap/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/map").Include(
                        "~/Scripts/map/jquery.min.js",
                      "~/Scripts/map/jquery.mapit.min.js"));
            #endregion

            #region Style
            bundles.Add(new StyleBundle("~/Styles/css").Include(
                      "~/Content/css/bootstrap.css",
                      "~/Content/css/global.css"));

            bundles.Add(new StyleBundle("~/Styles/registration").Include(
                "~/Content/css/registration.css"
            ));

            bundles.Add(new StyleBundle("~/Styles/layout").Include(
                  "~/Content/css/layout.css"));

            bundles.Add(new StyleBundle("~/Styles/feedback.css").Include(
                    "~/Content/css/feedback.css"));


            bundles.Add(new StyleBundle("~/Styles/plan.css").Include(
                    "~/Content/css/plan.css",
                    "~/Content/css/additionalInfoRoom.css"));
            #endregion
        }
    }
}
