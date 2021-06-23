Imports System.Runtime.InteropServices.WindowsRuntime

' The Share Target Contract item template is documented at http://go.microsoft.com/fwlink/?LinkId=234241

$wizardcomment$''' <summary>
''' This page allows other applications to share content through this application.
''' </summary>
Public NotInheritable Class $safeitemname$
    Inherits Page

    ''' <summary>
    ''' Provides a channel to communicate with Windows about the sharing operation.
    ''' </summary>
    Private _shareOperation As Windows.ApplicationModel.DataTransfer.ShareTarget.ShareOperation

    ''' <summary>
    ''' This can be changed to a strongly typed view model.
    ''' </summary>
    Public ReadOnly Property DefaultViewModel As Common.ObservableDictionary
        Get
            Return Me._defaultViewModel
        End Get
    End Property
    Private _defaultViewModel As New Common.ObservableDictionary()

    ''' <summary>
    ''' Invoked when another application wants to share content through this application.
    ''' </summary>
    ''' <param name="e">Activation data used to coordinate the process with Windows.</param>
    Public Async Sub Activate(e As ShareTargetActivatedEventArgs)
        Me._shareOperation = e.ShareOperation

        ' Communicate metadata about the shared content through the view model
        Dim shareProperties As Windows.ApplicationModel.DataTransfer.DataPackagePropertySetView = Me._shareOperation.Data.Properties
        Dim thumbnailImage As New BitmapImage()
        Me.DefaultViewModel("Title") = shareProperties.Title
        Me.DefaultViewModel("Description") = shareProperties.Description
        Me.DefaultViewModel("Image") = thumbnailImage
        Me.DefaultViewModel("Sharing") = False
        Me.DefaultViewModel("ShowImage") = False
        Me.DefaultViewModel("Comment") = String.Empty
        Me.DefaultViewModel("Placeholder") = "Add a comment"
        Me.DefaultViewModel("SupportsComment") = True
        Window.Current.Content = Me
        Window.Current.Activate()

        ' Update the shared content's thumbnail image in the background
        If shareProperties.Thumbnail IsNot Nothing Then
            Dim stream As Windows.Storage.Streams.IRandomAccessStreamWithContentType = Await shareProperties.Thumbnail.OpenReadAsync()
            thumbnailImage.SetSource(stream)
            Me.DefaultViewModel("ShowImage") = True
        End If
    End Sub

    ''' <summary>
    ''' Invoked when the user clicks the Share button.
    ''' </summary>
    ''' <param name="sender">Instance of Button used to initiate sharing.</param>
    ''' <param name="e">Event data describing how the button was clicked.</param>
    Private Sub ShareButton_Click(sender As Object, e As RoutedEventArgs)
        Me.DefaultViewModel("Sharing") = True
        Me._shareOperation.ReportStarted()

        ' TODO: Perform work appropriate to your sharing scenario using Me._shareOperation.Data,
        '       typically with additional information captured through custom user interface
        '       elements added to this page such as Me.DefaultViewModel("Comment")

        Me._shareOperation.ReportCompleted()
    End Sub

End Class
