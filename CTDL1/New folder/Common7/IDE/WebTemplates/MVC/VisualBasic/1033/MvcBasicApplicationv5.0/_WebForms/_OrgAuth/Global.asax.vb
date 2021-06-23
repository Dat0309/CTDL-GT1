Imports System.IdentityModel.Services
Imports System.Web.Mvc
Imports System.Web.Optimization
Imports System.Web.Routing
Imports System.Web.Security
Imports System.Web.SessionState

Public Class MvcApplication
    Inherits System.Web.HttpApplication

    Protected Sub Application_Start()
        AreaRegistration.RegisterAllAreas()
        IdentityConfig.ConfigureIdentity()
        FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters)
        RouteConfig.RegisterRoutes(RouteTable.Routes)
        BundleConfig.RegisterBundles(BundleTable.Bundles)
    End Sub

    Private Sub WSFederationAuthenticationModule_RedirectingToIdentityProvider(sender As Object, e As RedirectingToIdentityProviderEventArgs)
        If Not String.IsNullOrEmpty(IdentityConfig.Realm) Then
            e.SignInRequestMessage.Realm = IdentityConfig.Realm
        End If
    End Sub
End Class
