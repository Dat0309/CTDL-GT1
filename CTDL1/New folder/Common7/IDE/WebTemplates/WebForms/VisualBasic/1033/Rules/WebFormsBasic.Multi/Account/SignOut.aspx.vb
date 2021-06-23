Imports System
Imports System.Collections.Generic
Imports System.Configuration
Imports System.Linq
Imports System.Web
Imports System.Web.UI
Imports System.Web.UI.WebControls

Namespace Account
    Partial Public Class SignOut
        Inherits System.Web.UI.Page
        Protected Sub Page_Load(sender As Object, e As EventArgs)
            If Request.IsAuthenticated Then
                ' Redirect to home page if the user is authenticated.
                Response.Redirect("~/")
            End If
        End Sub
    End Class
End Namespace