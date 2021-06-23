Partial Public Class MainPage
    Inherits PhoneApplicationPage

    Private D3DInterop As Direct3DInterop = Nothing

    ' Constructor
    Public Sub New()
        InitializeComponent()
    End Sub

    Private Sub DrawingSurface_Loaded(sender As Object, e As RoutedEventArgs)
        If D3DInterop Is Nothing Then
            D3DInterop = New Direct3DInterop()

            ' Set window bounds in dips
            D3DInterop.WindowBounds = New Windows.Foundation.Size(
                DrawingSurface.ActualWidth,
                DrawingSurface.ActualHeight
                )

            ' Set native resolution in pixels
            D3DInterop.NativeResolution = New Windows.Foundation.Size(
                Math.Floor(DrawingSurface.ActualWidth * Application.Current.Host.Content.ScaleFactor / 100.0F + 0.5F),
                Math.Floor(DrawingSurface.ActualHeight * Application.Current.Host.Content.ScaleFactor / 100.0F + 0.5F)
                )

            ' Set render resolution to the full native resolution
            D3DInterop.RenderResolution = D3DInterop.NativeResolution

            ' Hook-up native component to DrawingSurface
            DrawingSurface.SetContentProvider(D3DInterop.CreateContentProvider())
            DrawingSurface.SetManipulationHandler(D3DInterop)
        End If
    End Sub
End Class