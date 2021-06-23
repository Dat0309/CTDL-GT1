using System.Web.Mvc;

namespace $AppNamespace$.Areas.$AreaName$ {
    public class $AreaName$AreaRegistration : AreaRegistration {
        public override string AreaName {
            get {
                return "$AreaName$";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) {
            context.MapRoute(
                "$AreaName$_default",
                "$AreaName$/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
