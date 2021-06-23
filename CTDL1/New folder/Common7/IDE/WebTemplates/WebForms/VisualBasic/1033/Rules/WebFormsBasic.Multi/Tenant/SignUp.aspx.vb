Imports System.Collections.Generic
Imports System.Configuration
Imports System.Globalization
Imports System.Linq
Imports System.Web
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports $safeprojectname$.Utils

Namespace Tenant
    Partial Public Class SignUp
        Inherits System.Web.UI.Page
        Private Shared Shadows ReadOnly ClientId As String = ConfigurationManager.AppSettings("ida:ClientID")
        Private Const ConsentUrlFormat As String = "https://account.activedirectory.windowsazure.com/Consent.aspx?ClientId={0}"
        
        Protected Sub Page_Load(sender As Object, e As EventArgs)

        End Sub

        Protected Sub SignUp_Click(sender As Object, e As EventArgs)
            Dim signupToken As String = Guid.NewGuid().ToString()
            Dim replyUrl As String = Request.Url.GetLeftPart(UriPartial.Authority) & Response.ApplyAppPathModifier("~/Tenant/SignupCallback?signupToken=" & signupToken)

            DatabaseIssuerNameRegistry.CleanUpExpiredSignupTokens()
            DatabaseIssuerNameRegistry.AddSignupToken(signupToken := signupToken, expirationTime := DateTimeOffset.UtcNow.AddMinutes(5))

            ' Redirect to the Active Directory consent page asking for permissions.
            Response.Redirect(CreateConsentUrl(clientId := ClientId, requestedPermissions := "DirectoryReaders", consentReturnUrl := replyUrl))
        End Sub

        Private Function CreateConsentUrl(clientId As String, requestedPermissions As String, consentReturnUrl As String) As String
            Dim consentUrl As String = [String].Format(CultureInfo.InvariantCulture, ConsentUrlFormat, HttpUtility.UrlEncode(clientId))

            If Not [String].IsNullOrEmpty(requestedPermissions) Then
                consentUrl += "&RequestedPermissions=" & HttpUtility.UrlEncode(requestedPermissions)
            End If
            If Not [String].IsNullOrEmpty(consentReturnUrl) Then
                consentUrl += "&ConsentReturnURL=" & HttpUtility.UrlEncode(consentReturnUrl)
            End If

            Return consentUrl
        End Function
    End Class
End Namespace
