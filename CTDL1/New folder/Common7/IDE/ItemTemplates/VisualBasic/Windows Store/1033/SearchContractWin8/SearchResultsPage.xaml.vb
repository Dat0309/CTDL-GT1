Imports System.Runtime.InteropServices.WindowsRuntime

' The Search Contract item template is documented at http://go.microsoft.com/fwlink/?LinkId=234240

$wizardcomment$''' <summary>
''' This page displays search results when a global search is directed to this application.
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

        ' Unpack the two values passed in the parameter object: query text and previous
        ' Window content
        Dim queryText As String = DirectCast(navigationParameter, String)

        ' TODO: Application-specific searching logic.  The search process is responsible for
        '       creating a list of user-selectable result categories:
        '
        '       filterList.Add(New Filter("<filter name>", <result count>))
        '
        '       Only the first filter, typically "All", should pass True as a third argument in
        '       order to start in an active state.  Results for the active filter are provided
        '       in Filter_SelectionChanged below.

        Dim filterList As New List(Of Filter)()
        filterList.Add(New Filter("All", 0, True))

        ' Communicate results through the view model
        Dim bindableProperties As New PropertySet()
        Me.DefaultViewModel("QueryText") = ChrW(&H201C) + queryText + ChrW(&H201D)
        Me.DefaultViewModel("Filters") = filterList
        Me.DefaultViewModel("ShowFilters") = filterList.Count > 1
    End Sub

    ''' <summary>
    ''' Invoked when a filter is selected using the ComboBox in snapped view state.
    ''' </summary>
    ''' <param name="sender">The ComboBox instance.</param>
    ''' <param name="e">Event data describing how the selected filter was changed.</param>
    Protected Sub Filter_SelectionChanged(sender As Object, e As SelectionChangedEventArgs)

        ' Determine what filter was selected
        Dim selectedFilter As Filter = TryCast(e.AddedItems.FirstOrDefault(), Filter)
        If selectedFilter IsNot Nothing Then

            ' Mirror the results into the corresponding Filter object to allow the
            ' RadioButton representation used when not snapped to reflect the change
            selectedFilter.Active = True

            ' TODO: Respond to the change in active filter by setting Me.DefaultViewModel("Results")
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

    ''' <summary>
    ''' Invoked when a filter is selected using a RadioButton when not snapped.
    ''' </summary>
    ''' <param name="sender">The selected RadioButton instance.</param>
    ''' <param name="e">Event data describing how the RadioButton was selected.</param>
    Protected Sub Filter_Checked(sender As Object, e As RoutedEventArgs)

        ' Mirror the change into the CollectionViewSource used by the corresponding ComboBox
        ' to ensure that the change is reflected when snapped
        If filtersViewSource.View IsNot Nothing Then
            Dim filter As Object = DirectCast(sender, FrameworkElement).DataContext
            filtersViewSource.View.MoveCurrentTo(filter)
        End If
    End Sub

    ''' <summary>
    ''' View model describing one of the filters available for viewing search results.
    ''' </summary>
    Private NotInheritable Class Filter
        Inherits Common.BindableBase

        Private _name As String
        Private _count As Integer
        Private _active As Boolean

        Public Sub New(name As String, count As Integer, Optional active As Boolean = false)
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

    End Class
    
End Class
