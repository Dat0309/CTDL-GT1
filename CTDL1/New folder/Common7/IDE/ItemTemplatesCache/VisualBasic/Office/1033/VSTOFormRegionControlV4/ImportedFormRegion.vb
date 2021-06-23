Public Class $safeitemrootname$

#Region "Form Region Factory"

$formregionattributes$    Partial Public Class $safeitemrootname$Factory

    Private Sub InitializeManifest()
            Dim resources As System.Resources.ResourceManager = New System.Resources.ResourceManager(GetType($safeitemrootname$))
$manifestinitialization$
    End Sub

    ' Occurs before the form region is initialized.
    ' To prevent the form region from appearing, set e.Cancel to true.
    ' Use e.OutlookItem to get a reference to the current Outlook item.
        Private Sub $safeitemrootname$Factory_FormRegionInitializing(ByVal sender As Object, ByVal e As Microsoft.Office.Tools.Outlook.FormRegionInitializingEventArgs) Handles Me.FormRegionInitializing

    End Sub

    End Class

#End Region

    ' Occurs before the form region is displayed.
    ' Use Me.OutlookItem to get a reference to the current Outlook item.
    ' Use Me.OutlookFormRegion to get a reference to the form region.
    Private Sub $safeitemrootname$_FormRegionShowing(ByVal sender As Object, ByVal e As System.EventArgs) Handles MyBase.FormRegionShowing

    End Sub

    ' Occurs when the form region is closed.
    ' Use Me.OutlookItem to get a reference to the current Outlook item.
    ' Use Me.OutlookFormRegion to get a reference to the form region.
    Private Sub $safeitemrootname$_FormRegionClosed(ByVal sender As Object, ByVal e As System.EventArgs) Handles MyBase.FormRegionClosed

    End Sub

End Class
