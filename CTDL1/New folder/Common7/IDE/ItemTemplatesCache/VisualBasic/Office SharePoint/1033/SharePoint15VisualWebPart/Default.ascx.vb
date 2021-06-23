Imports System
Imports System.ComponentModel
Imports System.Web.UI.WebControls.WebParts

<ToolboxItem(False)> _
Public Partial Class $safeitemrootname$
    Inherits WebPart

    ' $loc_constructor_comment1$
    ' $loc_constructor_comment2$
    ' $loc_constructor_comment3$
    ' $loc_constructor_comment4$
    ' <System.Security.Permissions.SecurityPermission(System.Security.Permissions.SecurityAction.Assert, UnmanagedCode := True)> _
    Public Sub New()
    End Sub

    Protected Overrides Sub OnInit(ByVal e As System.EventArgs)
        MyBase.OnInit(e)
        InitializeControl()
    End Sub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
    End Sub

End Class

