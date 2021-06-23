Imports System.ComponentModel
Imports System.Collections.ObjectModel

Public Class MainViewModel
    Implements INotifyPropertyChanged

    Public Sub New()
        Me.Items = New ObservableCollection(Of ItemViewModel)()
    End Sub

    ''' <summary>
    ''' A collection for ItemViewModel objects.
    ''' </summary>
    Public Property Items() As ObservableCollection(Of ItemViewModel)

    Private _sampleProperty As String = "Sample Runtime Property Value"
    ''' <summary>
    ''' Sample ViewModel property; this property is used in the view to display its value using a Binding
    ''' </summary>
    ''' <returns></returns>
    Public Property SampleProperty() As String
        Get
            Return _sampleProperty
        End Get
        Set(ByVal value As String)
            If Not value.Equals(_sampleProperty) Then
                _sampleProperty = value
                NotifyPropertyChanged("SampleProperty")
            End If
        End Set
    End Property

    ''' <summary>
    ''' Sample property that returns a localized string
    ''' </summary>
    Public ReadOnly Property LocalizedSampleProperty() As String
        Get
            Return AppResources.SampleProperty
        End Get
    End Property

    Public Property IsDataLoaded() As Boolean

    ''' <summary>
    ''' Creates and adds a few ItemViewModel objects into the Items collection.
    ''' </summary>
    Public Sub LoadData()
        ' Sample data; replace with real data
        Me.Items.Add(New ItemViewModel() With {.ID = "0", .LineOne = "runtime one", .LineTwo = "Maecenas praesent accumsan bibendum", .LineThree = "Facilisi faucibus habitant inceptos interdum lobortis nascetur pharetra placerat pulvinar sagittis senectus sociosqu"})
        Me.Items.Add(New ItemViewModel() With {.ID = "1", .LineOne = "runtime two", .LineTwo = "Dictumst eleifend facilisi faucibus", .LineThree = "Suscipit torquent ultrices vehicula volutpat maecenas praesent accumsan bibendum dictumst eleifend facilisi faucibus"})
        Me.Items.Add(New ItemViewModel() With {.ID = "2", .LineOne = "runtime three", .LineTwo = "Habitant inceptos interdum lobortis", .LineThree = "Habitant inceptos interdum lobortis nascetur pharetra placerat pulvinar sagittis senectus sociosqu suscipit torquent"})
        Me.Items.Add(New ItemViewModel() With {.ID = "3", .LineOne = "runtime four", .LineTwo = "Nascetur pharetra placerat pulvinar", .LineThree = "Ultrices vehicula volutpat maecenas praesent accumsan bibendum dictumst eleifend facilisi faucibus habitant inceptos"})
        Me.Items.Add(New ItemViewModel() With {.ID = "4", .LineOne = "runtime five", .LineTwo = "Maecenas praesent accumsan bibendum", .LineThree = "Maecenas praesent accumsan bibendum dictumst eleifend facilisi faucibus habitant inceptos interdum lobortis nascetur"})
        Me.Items.Add(New ItemViewModel() With {.ID = "5", .LineOne = "runtime six", .LineTwo = "Dictumst eleifend facilisi faucibus", .LineThree = "Pharetra placerat pulvinar sagittis senectus sociosqu suscipit torquent ultrices vehicula volutpat maecenas praesent"})
        Me.Items.Add(New ItemViewModel() With {.ID = "6", .LineOne = "runtime seven", .LineTwo = "Habitant inceptos interdum lobortis", .LineThree = "Accumsan bibendum dictumst eleifend facilisi faucibus habitant inceptos interdum lobortis nascetur pharetra placerat"})
        Me.Items.Add(New ItemViewModel() With {.ID = "7", .LineOne = "runtime eight", .LineTwo = "Nascetur pharetra placerat pulvinar", .LineThree = "Pulvinar sagittis senectus sociosqu suscipit torquent ultrices vehicula volutpat maecenas praesent accumsan bibendum"})
        Me.Items.Add(New ItemViewModel() With {.ID = "8", .LineOne = "runtime nine", .LineTwo = "Maecenas praesent accumsan bibendum", .LineThree = "Facilisi faucibus habitant inceptos interdum lobortis nascetur pharetra placerat pulvinar sagittis senectus sociosqu"})
        Me.Items.Add(New ItemViewModel() With {.ID = "9", .LineOne = "runtime ten", .LineTwo = "Dictumst eleifend facilisi faucibus", .LineThree = "Suscipit torquent ultrices vehicula volutpat maecenas praesent accumsan bibendum dictumst eleifend facilisi faucibus"})
        Me.Items.Add(New ItemViewModel() With {.ID = "10", .LineOne = "runtime eleven", .LineTwo = "Habitant inceptos interdum lobortis", .LineThree = "Habitant inceptos interdum lobortis nascetur pharetra placerat pulvinar sagittis senectus sociosqu suscipit torquent"})
        Me.Items.Add(New ItemViewModel() With {.ID = "11", .LineOne = "runtime twelve", .LineTwo = "Nascetur pharetra placerat pulvinar", .LineThree = "Ultrices vehicula volutpat maecenas praesent accumsan bibendum dictumst eleifend facilisi faucibus habitant inceptos"})
        Me.Items.Add(New ItemViewModel() With {.ID = "12", .LineOne = "runtime thirteen", .LineTwo = "Maecenas praesent accumsan bibendum", .LineThree = "Maecenas praesent accumsan bibendum dictumst eleifend facilisi faucibus habitant inceptos interdum lobortis nascetur"})
        Me.Items.Add(New ItemViewModel() With {.ID = "13", .LineOne = "runtime fourteen", .LineTwo = "Dictumst eleifend facilisi faucibus", .LineThree = "Pharetra placerat pulvinar sagittis senectus sociosqu suscipit torquent ultrices vehicula volutpat maecenas praesent"})
        Me.Items.Add(New ItemViewModel() With {.ID = "14", .LineOne = "runtime fifteen", .LineTwo = "Habitant inceptos interdum lobortis", .LineThree = "Accumsan bibendum dictumst eleifend facilisi faucibus habitant inceptos interdum lobortis nascetur pharetra placerat"})
        Me.Items.Add(New ItemViewModel() With {.ID = "15", .LineOne = "runtime sixteen", .LineTwo = "Nascetur pharetra placerat pulvinar", .LineThree = "Pulvinar sagittis senectus sociosqu suscipit torquent ultrices vehicula volutpat maecenas praesent accumsan bibendum"})

        Me.IsDataLoaded = True
    End Sub

    Public Event PropertyChanged As PropertyChangedEventHandler Implements INotifyPropertyChanged.PropertyChanged
    Private Sub NotifyPropertyChanged(ByVal propertyName As String)
        Dim handler As PropertyChangedEventHandler = PropertyChangedEvent
        If handler IsNot Nothing Then
            handler(Me, New PropertyChangedEventArgs(propertyName))
        End If
    End Sub
End Class