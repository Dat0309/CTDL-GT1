Imports System
Imports System.Collections.Generic
Imports System.Linq
Imports System.Web
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports $safeprojectname$.Utils

Namespace Tenant
    Partial Public Class SignUpCallback
        Inherits System.Web.UI.Page
        Private Shared _registryLock As New Object()

        Protected Sub Page_Load(sender As Object, e As EventArgs)
            If Not IsPostBack Then
                Dim tenantId As String = Request.QueryString("TenantId")
                Dim signupToken As String = Request.QueryString("signupToken")
                If DatabaseIssuerNameRegistry.ContainsTenant(tenantId) Then
                    ' The tenant is already registered, show the completion page. 
                    Return
                End If

                Dim consent As String = Request.QueryString("Consent")
                If Not [String].IsNullOrEmpty(tenantId) AndAlso [String].Equals(consent, "Granted", StringComparison.OrdinalIgnoreCase) Then
                    ' Register the tenant when the permission is granted.
                    If DatabaseIssuerNameRegistry.TryAddTenant(tenantId, signupToken) Then
                        Return
                    End If
                End If
            End If
        End Sub

        Protected Sub SignIn_Click(sender As Object, e As EventArgs)
            Response.Redirect("~/Account/SignIn")
        End Sub
    End Class
End Namespace
