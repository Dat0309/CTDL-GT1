Imports System
Imports System.Collections.Generic
Imports System.IdentityModel.Services
Imports System.IdentityModel.Services.Configuration
Imports System.Linq
Imports System.Web
Imports System.Web.UI
Imports System.Web.UI.WebControls

Namespace Account
    Partial Public Class SignIn
        Inherits System.Web.UI.Page
        Protected Sub Page_Load(sender As Object, e As EventArgs)
            If Request.IsAuthenticated Then
                Response.Redirect("~/")
            Else
                'Redirect to Home page after SignIn
                Dim config As WsFederationConfiguration = FederatedAuthentication.FederationConfiguration.WsFederationConfiguration
                Dim callbackUrl As String = Request.Url.GetLeftPart(UriPartial.Authority) + Response.ApplyAppPathModifier("~/")
                Dim signInRequest As SignInRequestMessage = FederatedAuthentication.WSFederationAuthenticationModule.CreateSignInRequest(uniqueId:=[String].Empty, returnUrl:=callbackUrl, rememberMeSet:=False)
                signInRequest.SetParameter("wtrealm", If(IdentityConfig.Realm, config.Realm))
                Response.Redirect(signInRequest.RequestUrl.ToString())
            End If
        End Sub
    End Class
End Namespace