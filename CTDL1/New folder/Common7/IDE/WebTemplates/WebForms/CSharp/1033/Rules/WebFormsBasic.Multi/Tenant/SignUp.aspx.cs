using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using $safeprojectname$.Utils;

namespace $safeprojectname$.Tenant
{
    public partial class SignUp : System.Web.UI.Page
    {
        private static readonly string ClientId = ConfigurationManager.AppSettings["ida:ClientID"];
        private const string ConsentUrlFormat = "https://account.activedirectory.windowsazure.com/Consent.aspx?ClientId={0}";
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void SignUp_Click(object sender, EventArgs e)
        {
            string signupToken = Guid.NewGuid().ToString();
            string replyUrl = Request.Url.GetLeftPart(UriPartial.Authority) + Response.ApplyAppPathModifier("~/Tenant/SignupCallback?signupToken=" + signupToken);

            DatabaseIssuerNameRegistry.CleanUpExpiredSignupTokens();
            DatabaseIssuerNameRegistry.AddSignupToken(signupToken: signupToken, expirationTime: DateTimeOffset.UtcNow.AddMinutes(5));

            // Redirect to the Active Directory consent page asking for permissions.
            Response.Redirect(CreateConsentUrl(
                clientId: ClientId,
                requestedPermissions: "DirectoryReaders",
                consentReturnUrl: replyUrl));
        }

        private string CreateConsentUrl(string clientId, string requestedPermissions,
                                        string consentReturnUrl)
        {
            string consentUrl = String.Format(
                 CultureInfo.InvariantCulture,
                 ConsentUrlFormat,
                 HttpUtility.UrlEncode(clientId));


            if (!String.IsNullOrEmpty(requestedPermissions))
            {
                consentUrl += "&RequestedPermissions=" + HttpUtility.UrlEncode(requestedPermissions);
            }
            if (!String.IsNullOrEmpty(consentReturnUrl))
            {
                consentUrl += "&ConsentReturnURL=" + HttpUtility.UrlEncode(consentReturnUrl);
            }

            return consentUrl;
        }

    }
}