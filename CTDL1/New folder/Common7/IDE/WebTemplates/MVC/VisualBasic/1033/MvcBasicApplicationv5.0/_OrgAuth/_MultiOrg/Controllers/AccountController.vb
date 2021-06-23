Imports System.Collections.Generic
Imports System.IdentityModel.Services
Imports System.IdentityModel.Services.Configuration
Imports System.Linq
Imports System.Web.Mvc

Public Class AccountController
    Inherits Controller
    Public Function SignIn() As ActionResult
          If Request.IsAuthenticated Then
              ' Redirect to home page if the user is already signed in.
              Return RedirectToAction("Index", "Home")
          End If

          ' Redirect to home page after signing in.
          Dim config As WsFederationConfiguration = FederatedAuthentication.FederationConfiguration.WsFederationConfiguration
          Dim callbackUrl As String = Url.Action("Index", "Home", routeValues:=Nothing, protocol:=Request.Url.Scheme)
          Dim signInRequest As SignInRequestMessage = FederatedAuthentication.WSFederationAuthenticationModule.CreateSignInRequest(
              uniqueId := [String].Empty,
              returnUrl := callbackUrl,
              rememberMeSet := False)
          signInRequest.SetParameter("wtrealm", If(IdentityConfig.Realm, config.Realm))
          Return New RedirectResult(signInRequest.RequestUrl.ToString())
    End Function

    Public Function SignOut() As ActionResult
        Dim config As WsFederationConfiguration = FederatedAuthentication.FederationConfiguration.WsFederationConfiguration

        ' Redirect to home page after signing out.
        Dim callbackUrl As String = Url.Action("Index", "Home", routeValues := Nothing, protocol := Request.Url.Scheme)
        Dim signoutMessage As New SignOutRequestMessage(New Uri(config.Issuer), callbackUrl)
        signoutMessage.SetParameter("wtrealm", If(IdentityConfig.Realm, config.Realm))
        FederatedAuthentication.SessionAuthenticationModule.SignOut()

        Return New RedirectResult(signoutMessage.WriteQueryString())
    End Function
End Class

