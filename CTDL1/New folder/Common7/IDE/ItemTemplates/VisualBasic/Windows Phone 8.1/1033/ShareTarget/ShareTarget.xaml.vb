Imports $rootnamespace$.Common

' The Share Target Contract item template is documented at http://go.microsoft.com/fwlink/?LinkID=390556

$wizardcomment$''' <summary>
''' This page allows other applications to share content through this application.
''' </summary>
Public NotInheritable Class $safeitemname$
    Inherits Page

    ''' <summary>
    ''' Provides a channel to communicate with Windows about the sharing operation.
    ''' </summary>
    Private _shareOperation As Windows.ApplicationModel.DataTransfer.ShareTarget.ShareOperation
    Private _defaultViewModel As New ObservableDictionary()

    ''' <summary>
    ''' Gets the view model for this <see cref="Page"/>.
    ''' This can be changed to a strongly typed view model.
    ''' </summary>
    Public ReadOnly Property DefaultViewModel As ObservableDictionary
        Get
            Return _defaultViewModel
        End Get
    End Property

    ''' <summary>
    ''' Invoked when another application wants to share content through this application.
    ''' </summary>
    ''' <param name="e">Activation data used to coordinate the process with Windows.</param>
    Public Async Sub Activate(e As ShareTargetActivatedEventArgs)
        _shareOperation = e.ShareOperation

        ' Communicate metadata about the shared content through the view model
        Dim shareProperties As Windows.ApplicationModel.DataTransfer.DataPackagePropertySetView = _shareOperation.Data.Properties
        Dim thumbnailImage As New BitmapImage()
        DefaultViewModel("Title") = shareProperties.Title
        DefaultViewModel("Description") = shareProperties.Description
        DefaultViewModel("Image") = thumbnailImage
        DefaultViewModel("Sharing") = False
        DefaultViewModel("ShowImage") = False
        DefaultViewModel("Comment") = String.Empty
        DefaultViewModel("Placeholder") = "Add a comment"
        DefaultViewModel("SupportsComment") = True

        Window.Current.Content = Me
        Window.Current.Activate()

        ' Update the shared content's thumbnail image in the background
        If shareProperties.Thumbnail IsNot Nothing Then
            Dim stream As Windows.Storage.Streams.IRandomAccessStreamWithContentType = Await shareProperties.Thumbnail.OpenReadAsync()
            thumbnailImage.SetSource(stream)
            DefaultViewModel("ShowImage") = True
        End If
    End Sub

    ''' <summary>
    ''' Invoked when the user clicks the Share button.
    ''' </summary>
    ''' <param name="sender">Instance of Button used to initiate sharing.</param>
    ''' <param name="e">Event data describing how the button was clicked.</param>
    Private Sub ShareButton_Click(sender As Object, e As RoutedEventArgs)
        DefaultViewModel("Sharing") = True

        ' TODO: Perform work appropriate to your sharing scenario using Me._shareOperation.Data,
        '       typically with additional information captured through custom user interface
        '       elements added to this page such as Me.DefaultViewModel("Comment")
        _shareOperation.ReportCompleted()
    End Sub

End Class
