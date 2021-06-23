Imports System.Runtime.InteropServices.WindowsRuntime

' The Grouped Items Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=234231

''' <summary>
''' A page that displays a grouped collection of items.
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
        ' TODO: Assign a collection of bindable groups to Me.DefaultViewModel("Groups")
    End Sub

End Class
