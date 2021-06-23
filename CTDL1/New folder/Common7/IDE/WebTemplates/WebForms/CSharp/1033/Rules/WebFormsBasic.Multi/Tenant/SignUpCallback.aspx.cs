using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using $safeprojectname$.Utils;

namespace $safeprojectname$.Tenant
{
    public partial class SignUpCallback : System.Web.UI.Page
    {
        private static object _registryLock = new object();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string tenantId = Request.QueryString["TenantId"];
                string signupToken = Request.QueryString["signupToken"];
                if (DatabaseIssuerNameRegistry.ContainsTenant(tenantId))
                {
                    // The tenant is already registered, show the completion page. 
                    return;
                }

                string consent = Request.QueryString["Consent"];
                if (!String.IsNullOrEmpty(tenantId) &&
                    String.Equals(consent, "Granted", StringComparison.OrdinalIgnoreCase))
                {
                    // Register the tenant when the permission is granted.
                    if (DatabaseIssuerNameRegistry.TryAddTenant(tenantId, signupToken))
                    {
                        return;
                    }
                }
            }
        }
        protected void SignIn_Click(object sender, EventArgs e)
        {
            Response.Redirect("~/Account/SignIn");
        }
    }
}