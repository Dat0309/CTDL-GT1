Imports System
Imports System.Threading
Imports System.Windows.Controls
Imports Microsoft.Phone.Controls
Imports Microsoft.Phone.Shell

Partial Public Class MainPage
    Inherits PhoneApplicationPage

    ' Url of Home page
    Private MainUri As String = "/Html/index.html"

    ' Constructor
    Public Sub New()
        InitializeComponent()

        SupportedOrientations = SupportedPageOrientation.Portrait Or SupportedPageOrientation.Landscape
    End Sub

    Private Sub Browser_Loaded(sender As Object, e As RoutedEventArgs)
        Browser.IsScriptEnabled = True

        ' Add your URL here
        Browser.Navigate(New Uri(MainUri, UriKind.Relative))       
    End Sub

    ' Navigates back in the web browser's navigation stack, not the applications.
    Private Sub BackApplicationBar_Click(sender As Object, e As EventArgs)
        Browser.GoBack()
    End Sub

    ' Navigates forward in the web browser's navigation stack, not the applications.
    Private Sub ForwardApplicationBar_Click(sender As Object, e As EventArgs)
        Browser.GoForward()
    End Sub

    ' Navigates to the initial "home" page.
    Private Sub HomeMenuItem_Click(sender As Object, e As EventArgs)
        Browser.Navigate(New Uri(MainUri, UriKind.Relative))
    End Sub

    ' Handle navigation failures.
    Private Sub Browser_NavigationFailed(sender As Object, e As System.Windows.Navigation.NavigationFailedEventArgs)
        MessageBox.Show("Navigation to this page failed, check your internet connection")
    End Sub

End Class