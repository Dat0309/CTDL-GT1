' Template rules
'   1. Snippets are marked with "'<snippet>" tokens. First marker occurrence determines snippet beginning.
'      Second marker occurrence determines end. It is recommended (but not required) to add BEGIN and
'      END suffixes for better readability, e.g. "'<snippet> - BEGIN", "'<snippet> - END".
'      Second marker can be omitted in case of single line snippet (e.g. see ClrNamespaceFooter marker).
'
'   2. Snippet markers should be located on a separate line above (beyond) snippet or at the end of the first 
'      (last) snippet line. Text from the marker to the end of the line will be removed.
'
'   3. FOLLOWING CASE SENSITIVE WORDS ARE RESERVED. They will be replaced with sample data names (type names,
'      property names, etc) during sample data code generation.
'          CLR_NAMESPACE
'          APPLICATION_NAMESPACE
'          SAMPLE_DATA_URI
'          COMPOSITE_TYPE
'          PROPERTY_NAME
'          PROPERTY_TYPE
'          PROPERTY_VALUE
'          COLLECTION_TYPE
'          ITEM_TYPE
'
'   4. Case sensitive snippet markers are
'          ClrNamespaceHeader
'          ClrNamespaceFooter
'          CompositeTypeHeader
'          CompositeTypeFooter
'          RootTypeConstructor
'          GetSetProperty
'          GetProperty
'          CollectionType
''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Imports System 'ClrNamespaceHeader - BEGIN
Imports System.ComponentModel
Namespace CLR_NAMESPACE
' To significantly reduce the sample data footprint in your production application, you can set
' the DISABLE_SAMPLE_DATA conditional compilation constant and disable sample data at runtime.
#If DISABLE_SAMPLE_DATA Then
    Friend Class COMPOSITE_TYPE
    End Class
#Else 'ClrNamespaceHeader - END

    Public Class COMPOSITE_TYPE  'CompositeTypeHeader - BEGIN
        Implements INotifyPropertyChanged

        Public Event PropertyChanged As PropertyChangedEventHandler Implements INotifyPropertyChanged.PropertyChanged

        Protected Overridable Sub OnPropertyChanged(ByVal propertyName As String)
            Dim handler As PropertyChangedEventHandler = Me.PropertyChangedEvent
            If handler IsNot Nothing Then
                RaiseEvent PropertyChanged(Me, New PropertyChangedEventArgs(propertyName))
            End If
        End Sub 'CompositeTypeHeader - END

        Public Sub New() 'RootTypeConstructor - BEGIN
            MyBase.New()
            Try
                Dim resourceUri As Uri = New Uri("SAMPLE_DATA_URI", UriKind.RelativeOrAbsolute)
                APPLICATION_NAMESPACE.Application.LoadComponent(Me, resourceUri)
            Catch __exception As System.Exception
            End Try
        End Sub 'RootTypeConstructor - END

        Private _PROPERTY_NAME As PROPERTY_TYPE = PROPERTY_VALUE 'GetSetProperty - BEGIN

        Public Property PROPERTY_NAME() As PROPERTY_TYPE
            Get
                Return Me._PROPERTY_NAME
            End Get

            Set(ByVal value As PROPERTY_TYPE)
                If Not Object.Equals(Me._PROPERTY_NAME, value) Then
                    Me._PROPERTY_NAME = value
                    Me.OnPropertyChanged("PROPERTY_NAME")
                End If
            End Set
        End Property 'GetSetProperty - END

        Private _PROPERTY_NAME As PROPERTY_TYPE = PROPERTY_VALUE 'GetProperty - BEGIN

        Public ReadOnly Property PROPERTY_NAME() As PROPERTY_TYPE
            Get
                Return Me._PROPERTY_NAME
            End Get
        End Property 'GetProperty - END
    End Class 'CompositeTypeFooter

    Public Class COLLECTION_TYPE 'CollectionType - BEGIN
        Inherits System.Collections.ObjectModel.ObservableCollection(Of ITEM_TYPE)
    End Class 'CollectionType - END
    'ClrNamespaceFooter - BEGIN
#End If
End Namespace
'ClrNamespaceFooter - END