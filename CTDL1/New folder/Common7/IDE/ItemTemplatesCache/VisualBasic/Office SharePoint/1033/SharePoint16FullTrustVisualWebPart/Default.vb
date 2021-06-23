Imports System
Imports System.ComponentModel
Imports System.Web
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports System.Web.UI.WebControls.WebParts
Imports Microsoft.SharePoint
Imports Microsoft.SharePoint.WebControls

<ToolboxItemAttribute(false)> _
Public Class $safeitemrootname$
    Inherits WebPart

    ' $loc_ascxPath_comment$
    Private Const _ascxPath As String = "~/_CONTROLTEMPLATES/15/$rootnamespace$/$fileinputname$/$fileinputname$UserControl.ascx"
    
    Protected Overrides Sub CreateChildControls()
        Dim control As Control = Page.LoadControl(_ascxPath)
        Controls.Add(control)
    End Sub

End Class
