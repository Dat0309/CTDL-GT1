Imports System
Imports System.Threading
Imports System.Windows.Controls
Imports Microsoft.Phone.Controls
Imports Microsoft.Phone.Shell

Partial Public Class MainPage
    Inherits PhoneApplicationPage

    ' Constructor
    Public Sub New()
        InitializeComponent()

        ' Set the data context of the listbox control to the sample data
        DataContext = App.ViewModel
    End Sub

    ' Load data for the ViewModel Items
    Protected Overrides Sub OnNavigatedTo(e As NavigationEventArgs)
        If Not App.ViewModel.IsDataLoaded Then
            App.ViewModel.LoadData()
        End If
    End Sub
End Class