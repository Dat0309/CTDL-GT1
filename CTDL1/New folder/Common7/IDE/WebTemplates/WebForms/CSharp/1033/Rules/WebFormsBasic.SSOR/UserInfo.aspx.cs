using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net.Http;
using Newtonsoft.Json;
using System.Threading.Tasks;
using $safeprojectname$.Models;

namespace $safeprojectname$
{
    public partial class UserInfo : System.Web.UI.Page
    {
        private const string TenantIdClaimType = "http://schemas.microsoft.com/identity/claims/tenantid";
        private const string LoginUrl = "https://login.windows.net/{0}";
        private const string GraphUrl = "https://graph.windows.net";
        private const string GraphUserUrl = "https://graph.windows.net/{0}/users/{1}?api-version=2013-04-05";
        private static readonly string AppPrincipalId = ConfigurationManager.AppSettings["ida:ClientID"];
        private static readonly string AppKey = ConfigurationManager.AppSettings["ida:Password"];

        protected void Page_Load(object sender, EventArgs e)
        {
            RegisterAsyncTask(new PageAsyncTask(GetUserData));            
        }

        public async Task GetUserData()
        {
            string tenantId = ClaimsPrincipal.Current.FindFirst(TenantIdClaimType).Value;

            // Get a token for calling the Windows Azure Active Directory Graph
            AuthenticationContext authContext = new AuthenticationContext(String.Format(CultureInfo.InvariantCulture, LoginUrl, tenantId));
            ClientCredential credential = new ClientCredential(AppPrincipalId, AppKey);
            AuthenticationResult assertionCredential = authContext.AcquireToken(GraphUrl, credential);
            string authHeader = assertionCredential.CreateAuthorizationHeader();
            string requestUrl = String.Format( 
                 CultureInfo.InvariantCulture,  
                 GraphUserUrl, 
                 HttpUtility.UrlEncode(tenantId), 
                 HttpUtility.UrlEncode(User.Identity.Name)); 


            HttpClient client = new HttpClient();
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, requestUrl);
            request.Headers.TryAddWithoutValidation("Authorization", authHeader);
            HttpResponseMessage response = await client.SendAsync(request);
            string responseString = await response.Content.ReadAsStringAsync();
            UserProfile profile = JsonConvert.DeserializeObject<UserProfile>(responseString);
            UserData.DataSource = new List<UserProfile> { profile };
            UserData.DataBind();
        }
    }
}