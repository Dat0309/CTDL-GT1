Imports System.Data.Entity.Validation
Imports System.IdentityModel.Services
Imports System.IdentityModel.Services.Configuration
Imports System.Security.Claims
Imports System.Threading.Tasks
Imports Microsoft.AspNet.Identity

Public Class AccountController
    Inherits Controller
    Public Function SignOut() As ActionResult
        Dim config As WsFederationConfiguration = FederatedAuthentication.FederationConfiguration.WsFederationConfiguration

        ' Redirect to SignOutCallback after signing out.
        Dim callbackUrl As String = Url.Action("SignOutCallback", "Account", routeValues := Nothing, protocol := Request.Url.Scheme)
        Dim signoutMessage As New SignOutRequestMessage(New Uri(config.Issuer), callbackUrl)
        signoutMessage.SetParameter("wtrealm", If(IdentityConfig.Realm, config.Realm))
        FederatedAuthentication.SessionAuthenticationModule.SignOut()

        Return New RedirectResult(signoutMessage.WriteQueryString())
    End Function

    Public Function SignOutCallback() As ActionResult
        If Request.IsAuthenticated Then
            ' Redirect to home page if the user is authenticated.
            Return RedirectToAction("Index", "Home")
        End If

        Return View()
    End Function
End Class
