' The WebView Application template is documented at http://go.microsoft.com/fwlink/?LinkID=391641

Public NotInheritable Class MainPage
    Inherits Page

    '' TODO: Replace with your URL here.
    Private Shared ReadOnly HomeUri As New Uri("ms-appx-web:///Html/index.html", UriKind.Absolute)

    Public Sub New()
        InitializeComponent()

        NavigationCacheMode = NavigationCacheMode.Required
    End Sub

    ''' <summary>
    ''' Invoked when this page is about to be displayed in a Frame.
    ''' </summary>
    ''' <param name="e">Event data that describes how this page was reached.
    ''' This parameter is typically used to configure the page.</param>
    Protected Overrides Sub OnNavigatedTo(e As NavigationEventArgs)
        WebViewControl.Navigate(HomeUri)

        AddHandler HardwareButtons.BackPressed, AddressOf MainPage_BackPressed
    End Sub

    ''' <summary>
    ''' Invoked when this page is being navigated away.
    ''' </summary>
    ''' <param name="e">Event data that describes how this page is navigating.</param>
    Protected Overrides Sub OnNavigatedFrom(e As NavigationEventArgs)
        RemoveHandler HardwareButtons.BackPressed, AddressOf MainPage_BackPressed
    End Sub

    ''' <summary>
    ''' Overrides the back button press to navigate in the WebView's back stack instead of the application's.
    ''' </summary>
    Private Sub MainPage_BackPressed(sender As Object, e As BackPressedEventArgs)
        If WebViewControl.CanGoBack Then
            WebViewControl.GoBack()
            e.Handled = True
        End If
    End Sub

    Private Sub Browser_NavigationCompleted(sender As Object, e As WebViewNavigationCompletedEventArgs)
        If Not e.IsSuccess Then
            Debug.WriteLine("Navigation to this page failed, check your internet connection.")
        End If
    End Sub

    ''' <summary>
    ''' Navigates forward in the WebView's history.
    ''' </summary>
    Private Sub ForwardAppBarButton_Click(sender As Object, e As RoutedEventArgs)
        If WebViewControl.CanGoForward Then
            WebViewControl.GoForward()
        End If
    End Sub

    ''' <summary>
    ''' Navigates to the initial home page.
    ''' </summary>
    Private Sub HomeAppBarButton_Click(sender As Object, e As RoutedEventArgs)
        WebViewControl.Navigate(HomeUri)
    End Sub
End Class
