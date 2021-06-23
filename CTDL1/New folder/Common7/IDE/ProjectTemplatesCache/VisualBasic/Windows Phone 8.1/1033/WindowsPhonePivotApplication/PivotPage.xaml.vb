Imports $safeprojectname$.Common
Imports $safeprojectname$.Data

' The Pivot Application template is documented at http://go.microsoft.com/fwlink/?LinkID=391641

Partial Public Class PivotPage
    Inherits Page

    Private Const FirstGroupName As String = "FirstGroup"
    Private Const SecondGroupName As String = "SecondGroup"

    Private WithEvents _navigationHelper As New NavigationHelper(Me)
    Private ReadOnly _defaultViewModel As New ObservableDictionary
    Private ReadOnly _resourceLoader As ResourceLoader = ResourceLoader.GetForCurrentView("Resources")

    Public Sub New()
        InitializeComponent()

        NavigationCacheMode = NavigationCacheMode.Required
    End Sub

    ''' <summary>
    ''' Gets the <see cref="NavigationHelper"/> associated with this <see cref="Page"/>.
    ''' </summary>
    Public ReadOnly Property NavigationHelper As NavigationHelper
        Get
            Return _navigationHelper
        End Get
    End Property

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
    ''' Populates the page with content passed during navigation. Any saved state is also
    ''' provided when recreating a page from a prior session.
    ''' </summary>
    ''' <param name="sender">
    ''' The source of the event; typically <see cref="NavigationHelper"/>.
    ''' </param>
    ''' <param name="e">Event data that provides both the navigation parameter passed to
    ''' <see cref="Frame.Navigate"/> when this page was initially requested and
    ''' a dictionary of state preserved by this page during an earlier
    ''' session. The state will be null the first time a page is visited.</param>
    Private Async Sub NavigationHelper_LoadState(sender As Object, e As LoadStateEventArgs) Handles _navigationHelper.LoadState
        ' TODO: Create an appropriate data model for your problem domain to replace the sample data
        Dim sampleDataGroup As SampleDataGroup = Await SampleDataSource.GetGroupAsync("Group-1")
        DefaultViewModel(FirstGroupName) = sampleDataGroup
    End Sub

    ''' <summary>
    ''' Preserves state associated with this page in case the application is suspended or the
    ''' page is discarded from the navigation cache.  Values must conform to the serialization
    ''' requirements of <see cref="SuspensionManager.SessionState"/>.
    ''' </summary>
    ''' <param name="sender">The source of the event; typically <see cref="NavigationHelper"/>.</param>
    ''' <param name="e">Event data that provides an empty dictionary to be populated with
    ''' serializable state.</param>
    Private Sub NavigationHelper_SaveState(sender As Object, e As SaveStateEventArgs) Handles _navigationHelper.SaveState
        ' TODO: Save the unique state of the page here.
    End Sub

    ''' <summary>
    ''' Adds an item to the list when the app bar button is clicked.
    ''' </summary>
    Private Sub AddAppBarButton_Click(sender As Object, e As RoutedEventArgs)
        Dim groupName As String
        If pivot.SelectedIndex = 0 Then
            groupName = FirstGroupName
        Else
            groupName = SecondGroupName
        End If

        Dim group As SampleDataGroup = DirectCast(DefaultViewModel(groupName), SampleDataGroup)
        Dim nextItemId As Integer = group.Items.Count + 1
        Dim newItem As SampleDataItem = New SampleDataItem(
                                        String.Format(CultureInfo.InvariantCulture, "Group-{0}-Item-{1}", pivot.SelectedIndex + 1, nextItemId),
                                        String.Format(CultureInfo.CurrentCulture, _resourceLoader.GetString("NewItemTitle"), nextItemId),
                                        String.Empty,
                                        String.Empty,
                                        _resourceLoader.GetString("NewItemDescription"),
                                        String.Empty)

        group.Items.Add(newItem)

        ' Scroll the new item into view.
        Dim container As ContentControl = DirectCast(pivot.ContainerFromIndex(pivot.SelectedIndex), ContentControl)
        Dim listView As ListView = DirectCast(container.ContentTemplateRoot, ListView)
        listView.ScrollIntoView(newItem, ScrollIntoViewAlignment.Leading)
    End Sub

    ''' <summary>
    ''' Invoked when an item within a section is clicked.
    ''' </summary>
    Private Sub ItemView_ItemClick(sender As Object, e As ItemClickEventArgs)
        Dim itemId As String = DirectCast(e.ClickedItem, SampleDataItem).UniqueId
        If Not Frame.Navigate(GetType(ItemPage), itemId) Then
            Throw New Exception(_resourceLoader.GetString("NavigationFailedExceptionMessage"))
        End If
    End Sub

    ''' <summary>
    ''' Load the content for the second pivot item when it is scrolled into view.
    ''' </summary>
    Private Async Sub SecondPivot_Loaded(sender As Object, e As RoutedEventArgs)
        Dim sampleDataGroup As SampleDataGroup = Await SampleDataSource.GetGroupAsync("Group-2")
        DefaultViewModel(SecondGroupName) = sampleDataGroup
    End Sub

#Region "NavigationHelper registration"

    ''' <summary>
    ''' The methods provided in this section are simply used to allow
    ''' NavigationHelper to respond to the page's navigation methods.
    ''' <para>
    ''' Page specific logic should be placed in event handlers for the
    ''' <see cref="NavigationHelper.LoadState"/>
    ''' and <see cref="NavigationHelper.SaveState"/>.
    ''' The navigation parameter is available in the LoadState method
    ''' in addition to page state preserved during an earlier session.
    ''' </para>
    ''' </summary>
    ''' <param name="e">Event data that describes how this page was reached.</param>
    Protected Overrides Sub OnNavigatedTo(e As NavigationEventArgs)
        _navigationHelper.OnNavigatedTo(e)
    End Sub

    Protected Overrides Sub OnNavigatedFrom(e As NavigationEventArgs)
        _navigationHelper.OnNavigatedFrom(e)
    End Sub

#End Region

End Class
