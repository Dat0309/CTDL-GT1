using System;
using System.Collections.Generic;
using System.IdentityModel.Services;
using System.IdentityModel.Services.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace $safeprojectname$.Account
{
    public partial class SignIn : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.IsAuthenticated)
            {
                Response.Redirect("~/");
            }
            else
            {
                //Redirect to Home page after SignIn
                WsFederationConfiguration config = FederatedAuthentication.FederationConfiguration.WsFederationConfiguration;
                string callbackUrl = Request.Url.GetLeftPart(UriPartial.Authority) + Response.ApplyAppPathModifier("~/");
                SignInRequestMessage signInRequest = FederatedAuthentication.WSFederationAuthenticationModule.CreateSignInRequest(
                    uniqueId: String.Empty,
                    returnUrl: callbackUrl,
                    rememberMeSet: false);
                signInRequest.SetParameter("wtrealm", IdentityConfig.Realm ?? config.Realm);
                Response.Redirect(signInRequest.RequestUrl.ToString());
            }
        }
    }
}