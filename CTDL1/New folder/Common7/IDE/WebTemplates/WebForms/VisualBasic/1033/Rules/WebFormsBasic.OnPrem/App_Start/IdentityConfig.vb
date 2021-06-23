Imports System.Collections.Generic
Imports System.Configuration
Imports System.IdentityModel.Services
Imports System.Linq

' For more information on ASP.NET Identity, please visit http://go.microsoft.com/fwlink/?LinkId=301882
Public Module IdentityConfig
    Private _audienceUri As String
    Private _realm As String

    Public Property AudienceUri() As String
        Get
            Return _audienceUri
        End Get
        Private Set
            _audienceUri = Value
        End Set
    End Property

    Public Property Realm() As String
        Get
            Return _realm
        End Get
        Private Set
            _realm = Value
        End Set
    End Property

    Public Sub ConfigureIdentity()
        ' Set the realm for the application
        Realm = ConfigurationManager.AppSettings("ida:realm")

        ' Set the audienceUri for the application
        AudienceUri = ConfigurationManager.AppSettings("ida:AudienceUri")
        If Not String.IsNullOrEmpty(AudienceUri) Then
            UpdateAudienceUri()
        End If
    End Sub

    Public Sub UpdateAudienceUri()
        Dim allowedUris As IEnumerable(Of Uri) _
            = FederatedAuthentication.FederationConfiguration.IdentityConfiguration.AudienceRestriction.AllowedAudienceUris

        Dim count As Integer = allowedUris.Count(
            Function(uri) String.Equals(uri.OriginalString, AudienceUri, StringComparison.OrdinalIgnoreCase))

        If count = 0 Then
            FederatedAuthentication.FederationConfiguration _
                .IdentityConfiguration.AudienceRestriction.AllowedAudienceUris.Add(New Uri(IdentityConfig.AudienceUri))
        End If
    End Sub
End Module

