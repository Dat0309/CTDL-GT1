Imports System.IdentityModel.Services
Imports System.Web.Http
Imports System.Web.Mvc
Imports System.Web.Optimization
Imports System.Web.Routing

Public Class MvcApplication
    Inherits System.Web.HttpApplication

    Protected Sub Application_Start()
        AreaRegistration.RegisterAllAreas()
        IdentityConfig.ConfigureIdentity()
        GlobalConfiguration.Configure(AddressOf WebApiConfig.Register)
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
