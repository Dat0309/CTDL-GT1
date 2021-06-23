Imports System.Runtime.InteropServices.WindowsRuntime

' The Item Detail Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=234232

''' <summary>
''' A page that displays details for a single item within a group while allowing
''' gestures to flip through other items belonging to the same group.
''' </summary>
Public NotInheritable Class $safeitemname$
    Inherits Common.LayoutAwarePage

    ''' <summary>
    ''' Populates the page with content passed during navigation.  Any saved state is also
    ''' provided when recreating a page from a prior session.
    ''' </summary>
    ''' <param name="navigationParameter">The parameter value passed to <see cref="Frame.Navigate"/>
    ''' when this page was initially requested.
    ''' </param>
    ''' <param name="pageState">A dictionary of state preserved by this page during an earlier
    ''' session.  This will be null the first time a page is visited.</param>
    Protected Overrides Sub LoadState(navigationParameter As Object, pageState As Dictionary(Of String, Object))

        ' Allow saved page state to override the initial item to display
        If pageState IsNot Nothing AndAlso pageState.ContainsKey("SelectedItem") Then
            navigationParameter = pageState("SelectedItem")
        End If

        ' TODO: Assign a bindable group to Me.DefaultViewModel("Group")
        ' TODO: Assign a collection of bindable items to Me.DefaultViewModel("Items")
        ' TODO: Assign the selected item to Me.flipView.SelectedItem
    End Sub

    ''' <summary>
    ''' Preserves state associated with this page in case the application is suspended or the
    ''' page is discarded from the navigation cache.  Values must conform to the serialization
    ''' requirements of <see cref="Common.SuspensionManager.SessionState"/>.
    ''' </summary>
    ''' <param name="pageState">An empty dictionary to be populated with serializable state.</param>
    Protected Overrides Sub SaveState(pageState As Dictionary(Of String, Object))
        Dim selectedItem As Object = Me.flipView.SelectedItem
        ' TODO: Derive a serializable navigation parameter and assign it to pageState("SelectedItem")
    End Sub

End Class
