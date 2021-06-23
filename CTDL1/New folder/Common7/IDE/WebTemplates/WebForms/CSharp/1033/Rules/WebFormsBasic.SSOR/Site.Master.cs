using System;
using System.Collections.Generic;
using System.IdentityModel.Services;
using System.IdentityModel.Services.Configuration;
using System.Security.Claims;
using System.Security.Principal;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace $safeprojectname$
{
    public partial class SiteMaster : MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected void Unnamed_LoggingOut(object sender, LoginCancelEventArgs e)
        {
            WsFederationConfiguration config = FederatedAuthentication.FederationConfiguration.WsFederationConfiguration;
            // Redirect to ~/Account/SignOut after signing out.
            string callbackUrl = Request.Url.GetLeftPart(UriPartial.Authority) + Response.ApplyAppPathModifier("~/Account/SignOut");
            SignOutRequestMessage signoutMessage = new SignOutRequestMessage(new Uri(config.Issuer), callbackUrl);
            signoutMessage.SetParameter("wtrealm", IdentityConfig.Realm ?? config.Realm);
            FederatedAuthentication.SessionAuthenticationModule.SignOut();
            Response.Redirect(signoutMessage.WriteQueryString());
        }
    }
}