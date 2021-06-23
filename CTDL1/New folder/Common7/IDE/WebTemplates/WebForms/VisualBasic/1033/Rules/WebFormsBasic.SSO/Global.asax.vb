Imports System.Web.Optimization
Imports System.IdentityModel.Services

Public Class Global_asax
    Inherits HttpApplication

    Private Sub Application_Start(sender As Object, e As EventArgs)
        ' Code that runs on application startup
        RouteConfig.RegisterRoutes(RouteTable.Routes)
        BundleConfig.RegisterBundles(BundleTable.Bundles)
        IdentityConfig.ConfigureIdentity()
    End Sub

    Sub WSFederationAuthenticationModule_RedirectingToIdentityProvider(sender As Object, e As RedirectingToIdentityProviderEventArgs)
        If Not [String].IsNullOrEmpty(Realm) Then
            e.SignInRequestMessage.Realm = Realm
        End If
    End Sub
End Class
