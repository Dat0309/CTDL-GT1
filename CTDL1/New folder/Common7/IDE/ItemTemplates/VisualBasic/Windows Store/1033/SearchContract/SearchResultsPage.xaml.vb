
' TODO: Connect the Search Results Page to your in-app search.
' The Search Results Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=234240

''' <summary>
''' This page displays search results when a global search is directed to this application.
''' </summary>
Public NotInheritable Class $safeitemname$
    Inherits Page

    Private _navigationHelper As Common.NavigationHelper
    Public ReadOnly Property NavigationHelper() As Common.NavigationHelper
        Get
            Return Me._navigationHelper
        End Get
    End Property

    ''' <summary>
    ''' This can be changed to a strongly typed view model.
    ''' </summary>
    Public ReadOnly Property DefaultViewModel As Common.ObservableDictionary
        Get
            Return Me._defaultViewModel
        End Get
    End Property
    Private _defaultViewModel As New Common.ObservableDictionary()


    Public Sub New()
        Me.InitializeComponent()
        Me._navigationHelper = New Common.NavigationHelper(Me)
        AddHandler Me._navigationHelper.LoadState, AddressOf NavigationHelper_LoadState
    End Sub

    ''' <summary>
    ''' Populates the page with content passed during navigation.  Any saved state is also
    ''' provided when recreating a page from a prior session.
    ''' </summary>
    ''' <param name="sender">
    ''' The source of the event; typically <see cref="NavigationHelper"/>
    ''' </param>
    ''' <param name="e">Event data that provides both the navigation parameter passed to
    ''' <see cref="Frame.Navigate"/> when this page was initially requested and
    ''' a dictionary of state preserved by this page during an earlier
    ''' session.  The state will be null the first time a page is visited.</param>
    Private Sub NavigationHelper_LoadState(sender As Object, e As Common.LoadStateEventArgs)
        Dim queryText As String = TryCast(e.NavigationParameter, [String])

        ' TODO: Application-specific searching logic.  The search process is responsible for
        '       creating a list of user-selectable result categories:
        '
        '       filterList.Add(new Filter("<filter name>", <result count>));
        '
        '       Only the first filter, typically "All", should pass true as a third argument in
        '       order to start in an active state.  Results for the active filter are provided
        '       in Filter_SelectionChanged below.

        Dim filterList As New List(Of Filter)()
        filterList.Add(New Filter("All", 0, True))

        ' Communicate results through the view model
        Me.DefaultViewModel("QueryText") = ChrW(&H201C) + queryText + ChrW(&H201D)
        Me.DefaultViewModel("Filters") = filterList
        Me.DefaultViewModel("ShowFilters") = filterList.Count > 1
    End Sub

    ''' <summary>
    ''' Invoked when a filter is selected using a RadioButton when not snapped.
    ''' </summary>
    ''' <param name="sender">The selected RadioButton instance.</param>
    ''' <param name="e">Event data describing how the RadioButton was selected.</param>
    Private Sub Filter_Checked(sender As Object, e As RoutedEventArgs)
        Dim filter As Object = TryCast(sender, FrameworkElement).DataContext

        ' Mirror the change into the CollectionViewSource.
        If filtersViewSource.View IsNot Nothing Then
            filtersViewSource.View.MoveCurrentTo(filter)
        End If

        ' Determine what filter was selected
        Dim selectedFilter As Filter = TryCast(filter, Filter)
        If selectedFilter IsNot Nothing Then
            ' Mirror the results into the corresponding Filter object to allow the
            ' RadioButton representation used when not snapped to reflect the change
            selectedFilter.Active = True

            ' TODO: Respond to the change in active filter by setting Me.DefaultViewModel["Results"]
            '       to a collection of items with bindable Image, Title, Subtitle, and Description properties

            ' Ensure results are found
            Dim results As Object = Nothing

            If Me.DefaultViewModel.TryGetValue("Results", results) Then
                Dim ResultsCollection As ICollection = TryCast(results, ICollection)
                If ResultsCollection IsNot Nothing AndAlso ResultsCollection.Count <> 0 Then
                    VisualStateManager.GoToState(Me, "ResultsFound", True)
                    Return
                End If
            End If
        End If
        ' Display informational text when there are no search results.
        VisualStateManager.GoToState(Me, "NoResultsFound", True)
    End Sub

#Region "NavigationHelper registration"

    ''' The methods provided in this section are simply used to allow
    ''' NavigationHelper to respond to the page's navigation methods.
    ''' 
    ''' Page specific logic should be placed in event handlers for the  
    ''' <see cref="Common.NavigationHelper.LoadState"/>
    ''' and <see cref="Common.NavigationHelper.SaveState"/>.
    ''' The navigation parameter is available in the LoadState method 
    ''' in addition to page state preserved during an earlier session.

    Protected Overrides Sub OnNavigatedTo(e As NavigationEventArgs)
        _navigationHelper.OnNavigatedTo(e)
    End Sub

    Protected Overrides Sub OnNavigatedFrom(e As NavigationEventArgs)
        _navigationHelper.OnNavigatedFrom(e)
    End Sub

#End Region

    ''' <summary>
    ''' View model describing one of the filters available for viewing search results.
    ''' </summary>
    Private NotInheritable Class Filter
        Implements INotifyPropertyChanged
        Private _name As String
        Private _count As Integer
        Private _active As Boolean

        Public Sub New(name As String, count As Integer, Optional active As Boolean = False)
            Me.Name = name
            Me.Count = count
            Me.Active = active
        End Sub

        Public Overrides Function ToString() As String
            Return Description
        End Function

        Public Property Name As String
            Get
                Return _name
            End Get
            Set(value As String)
                If Me.SetProperty(_name, value) Then Me.OnPropertyChanged("Description")
            End Set
        End Property

        Public Property Count As Integer
            Get
                Return _count
            End Get
            Set(value As Integer)
                If Me.SetProperty(_count, value) Then Me.OnPropertyChanged("Description")
            End Set
        End Property

        Public Property Active As Boolean
            Get
                Return _active
            End Get
            Set(value As Boolean)
                Me.SetProperty(_active, value)
            End Set
        End Property

        Public ReadOnly Property Description As String
            Get
                Return String.Format("{0} ({1})", _name, _count)
            End Get
        End Property

        ''' <summary>
        ''' Multicast event for property change notifications.
        ''' </summary>
        Public Event PropertyChanged As PropertyChangedEventHandler Implements INotifyPropertyChanged.PropertyChanged

        ''' <summary>
        ''' Checks if a property already matches a desired value.  Sets the property and
        ''' notifies listeners only when necessary.
        ''' </summary>
        ''' <typeparam name="T">Type of the property.</typeparam>
        ''' <param name="storage">Reference to a property with both getter and setter.</param>
        ''' <param name="value">Desired value for the property.</param>
        ''' <param name="propertyName">Name of the property used to notify listeners.  This
        ''' value is optional and can be provided automatically when invoked from compilers that
        ''' support CallerMemberName.</param>
        ''' <returns>True if the value was changed, false if the existing value matched the
        ''' desired value.</returns>
        Private Function SetProperty(Of T)(ByRef storage As T, value As T, <CallerMemberName> Optional propertyName As [String] = Nothing) As Boolean
            If Object.Equals(storage, value) Then
                Return False
            End If

            storage = value
            Me.OnPropertyChanged(propertyName)
            Return True
        End Function

        ''' <summary>
        ''' Notifies listeners that a property value has changed.
        ''' </summary>
        ''' <param name="propertyName">Name of the property used to notify listeners.  This
        ''' value is optional and can be provided automatically when invoked from compilers
        ''' that support <see cref="CallerMemberNameAttribute"/>.</param>
        Private Sub OnPropertyChanged(<CallerMemberName> Optional propertyName As String = Nothing)
            RaiseEvent PropertyChanged(Me, New PropertyChangedEventArgs(propertyName))
        End Sub

    End Class
End Class
