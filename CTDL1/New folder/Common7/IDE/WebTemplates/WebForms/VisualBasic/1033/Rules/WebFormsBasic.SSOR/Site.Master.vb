
Imports System
Imports System.Collections.Generic
Imports System.IdentityModel.Services
Imports System.IdentityModel.Services.Configuration
Imports System.Security.Claims
Imports System.Security.Principal
Imports System.Web
Imports System.Web.Security
Imports System.Web.UI
Imports System.Web.UI.WebControls

Partial Public Class SiteMaster
    Inherits MasterPage
    Protected Sub Page_Load(sender As Object, e As EventArgs)

    End Sub
    Protected Sub Unnamed_LoggingOut(sender As Object, e As LoginCancelEventArgs)
        Dim config As WsFederationConfiguration = FederatedAuthentication.FederationConfiguration.WsFederationConfiguration
        ' Redirect to ~/Account/SignOut after signing out.
        Dim callbackUrl As String = Request.Url.GetLeftPart(UriPartial.Authority) + Response.ApplyAppPathModifier("~/Account/SignOut")
        Dim signoutMessage As New SignOutRequestMessage(New Uri(config.Issuer), callbackUrl)
        signoutMessage.SetParameter("wtrealm", If(IdentityConfig.Realm, config.Realm))
        FederatedAuthentication.SessionAuthenticationModule.SignOut()
        Response.Redirect(signoutMessage.WriteQueryString())
    End Sub
End Class
