Imports System.IdentityModel.Tokens
Imports Microsoft.Owin.Security
Imports Microsoft.Owin.Security.ActiveDirectory
Imports Owin

Public Partial Class Startup
    ' For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
    Public Sub ConfigureAuth(app As IAppBuilder)
        app.UseActiveDirectoryFederationServicesBearerAuthentication(New ActiveDirectoryFederationServicesBearerAuthenticationOptions() With {
            .MetadataEndpoint = ConfigurationManager.AppSettings("ida:AdfsMetadataEndpoint"),
            .TokenValidationParameters = New TokenValidationParameters() With {
                .ValidAudience = ConfigurationManager.AppSettings("ida:Audience")
            }
        })
    End Sub
End Class
