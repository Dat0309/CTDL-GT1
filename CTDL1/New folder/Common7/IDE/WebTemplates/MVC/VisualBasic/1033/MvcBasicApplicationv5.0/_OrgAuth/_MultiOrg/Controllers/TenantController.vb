Imports System.Globalization
Imports System.Web
Imports System.Web.Mvc
Imports $safeprojectname$.Utils

Public Class TenantController
    Inherits Controller
    Private Shared ReadOnly ClientId As String = ConfigurationManager.AppSettings("ida:ClientID")
    Private Const ConsentUrlFormat As String = "https://account.activedirectory.windowsazure.com/Consent.aspx?ClientId={0}"

    Public Function Index() As ActionResult
        Return View()
    End Function

    Public Function SignUp() As ActionResult
        Dim signupToken As String = Guid.NewGuid().ToString()
        Dim replyUrl As String = Url.Action("SignUpCallback", "Tenant", routeValues := New With {
            .signupToken = signupToken
        }, protocol := Request.Url.Scheme)
        DatabaseIssuerNameRegistry.CleanUpExpiredSignupTokens()
        DatabaseIssuerNameRegistry.AddSignupToken(signupToken := signupToken, expirationTime := DateTimeOffset.UtcNow.AddMinutes(5))

        ' Redirect to the Active Directory consent page asking for permissions.
        Return New RedirectResult(CreateConsentUrl(clientId := ClientId, requestedPermissions := "DirectoryReaders", consentReturnUrl := replyUrl))
    End Function

    Public Function SignUpCallback() As ActionResult
        Dim tenantId As String = Request.QueryString("TenantId")
        Dim signupToken As String = Request.QueryString("signupToken")
        If DatabaseIssuerNameRegistry.ContainsTenant(tenantId) Then
            ' The tenant is already registered, show the completion page.
            Return View()
        End If

        Dim consent As String = Request.QueryString("Consent")
        If Not [String].IsNullOrEmpty(tenantId) AndAlso [String].Equals(consent, "Granted", StringComparison.OrdinalIgnoreCase) Then
            ' Register the tenant when the permission is granted.
            If DatabaseIssuerNameRegistry.TryAddTenant(tenantId, signupToken) Then
                Return View()
            End If
        End If

        Return View("Error")
    End Function

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
