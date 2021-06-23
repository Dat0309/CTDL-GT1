' Template rules
'   1. Snippets are marked with "'<snippet>" tokens. First marker occurrence determines snippet beginning.
'      Second marker occurrence determines end. It is recommended (but not required) to add BEGIN and
'      END suffixes for better readability, e.g. "'<snippet> - BEGIN", "'<snippet> - END".
'      Second marker can be omitted in case of single line snippet (e.g. see ClrNamespaceFooter marker).
'
'   2. Snippet markers should be located on a separate line above (beyond) snippet or at the end of the first 
'      (last) snippet line. Text from the marker to the end of the line will be removed.
'
'   3. FOLLOWING CASE SENSITIVE WORDS ARE RESERVED. They will be replaced with data store names (type names,
'      property names, etc) during sample data code generation.
'          CLR_NAMESPACE
'          GLOBALSTORAGE_TYPE
'          DATASTORE_TYPE
'          PROPERTY_NAME
'          PROPERTY_TYPE
'          PROPERTY_VALUE
'          PROJECT_ASSEMBLY_NAME
'          DATA_STORE_ROOT_FOLDER
'          DATA_STORE_NAME
'
'   4. Case sensitive snippet markers are
'          ClrNamespaceHeader
'          ClrNamespaceFooter
'          GlobalStorageTypeHeader
'          GlobalStorageTypeFooter
'          GlobalStorageGetSetProperty
'          DataStoreTypeHeader
'          DataStoreTypeFooter
'          DataStoreTypeConstructor
'          DataStoreGetSetProperty
''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Imports System  'ClrNamespaceHeader - BEGIN
Imports System.Collections.Generic
Namespace CLR_NAMESPACE 'ClrNamespaceHeader - END
	Public Class GLOBALSTORAGE_TYPE  'GlobalStorageTypeHeader - BEGIN
		Public Shared Singleton As GLOBALSTORAGE_TYPE
		Private _registrar As List(Of WeakReference)
		Private _loading As Boolean

		
		Public Property Loading As Boolean
		Get
			Return Me._loading
		End Get
		Set(ByVal value As Boolean)
				Me._loading = value
		End Set
		End Property
		
		Shared Sub New()
			GLOBALSTORAGE_TYPE.Singleton = New GLOBALSTORAGE_TYPE
		End Sub
		
		Public Sub New()
			Me._registrar = New List(Of WeakReference)
		End Sub

		Public Sub Register(ByVal dataStore As DATASTORE_TYPE)
			Me._registrar.Add(new WeakReference(dataStore))
		End Sub
		
		Public Sub OnPropertyChanged(ByVal propertyName As String)
			Dim entry As WeakReference
			For Each entry In Me._registrar
				If entry.IsAlive Then
					DirectCast(entry.Target, DATASTORE_TYPE).FirePropertyChanged(propertyName)
				End If
			Next
		End Sub
				
		Public ReadOnly Property AssignementAllowed As Boolean
			Get
				If (Me.Loading AndAlso (Me._registrar.Count > 0)) Then
					Return False
				End If
				Return True
			End Get
		End Property 

		'Properties listed below 
		'GlobalStorageTypeHeader - END
		Private _PROPERTY_NAME As PROPERTY_TYPE = PROPERTY_VALUE 'GlobalStorageGetSetProperty - BEGIN
		Public Property PROPERTY_NAME() As PROPERTY_TYPE
			Get
				Return Me._PROPERTY_NAME
			End Get

			Set(ByVal value As PROPERTY_TYPE)
				If (Me.AssignementAllowed AndAlso (Me._PROPERTY_NAME <> value)) Then
					Me._PROPERTY_NAME = value
					Me.OnPropertyChanged("PROPERTY_NAME")
				End If
			End Set
		End Property 'GlobalStorageGetSetProperty - END
	End Class 'GlobalStorageTypeFooter
	
	Public Class DATASTORE_TYPE  'DataStoreTypeHeader - BEGIN
		Implements System.ComponentModel.INotifyPropertyChanged

		Public Event PropertyChanged As System.ComponentModel.PropertyChangedEventHandler Implements System.ComponentModel.INotifyPropertyChanged.PropertyChanged
		
		Public Sub FirePropertyChanged(ByVal propertyName As String)
			Me.OnPropertyChanged(propertyName)
		End Sub
		
		Protected Overridable Sub OnPropertyChanged(ByVal propertyName As String)
			Dim handler As System.ComponentModel.PropertyChangedEventHandler = Me.PropertyChangedEvent
			If handler IsNot Nothing Then
				RaiseEvent PropertyChanged(Me, New System.ComponentModel.PropertyChangedEventArgs(propertyName))
			End If
		End Sub 'DataStoreTypeHeader - END

		Public Sub New() 'DataStoreTypeConstructor - BEGIN
			MyBase.New()
			Try
				Dim resourceUri As System.Uri = New System.Uri("/PROJECT_ASSEMBLY_NAME;component/DATA_STORE_ROOT_FOLDER/DATA_STORE_NAME/DATA_STORE_NAME.xaml", System.UriKind.Relative)
				If System.Windows.Application.GetResourceStream(resourceUri) IsNot Nothing Then
					GLOBALSTORAGE_TYPE.Singleton.Loading = True
					System.Windows.Application.LoadComponent(Me, resourceUri)
					GLOBALSTORAGE_TYPE.Singleton.Loading = False
					GLOBALSTORAGE_TYPE.Singleton.Register(Me)
				End If
			Catch __exception As System.Exception
			End Try
		End Sub 'DataStoreTypeConstructor - END

		Private _PROPERTY_NAME As PROPERTY_TYPE = PROPERTY_VALUE 'DataStoreGetSetProperty - BEGIN
		Public Property PROPERTY_NAME() As PROPERTY_TYPE
			Get
				 Return GLOBALSTORAGE_TYPE.Singleton.PROPERTY_NAME
			End Get

			Set(ByVal value As PROPERTY_TYPE)
				GLOBALSTORAGE_TYPE.Singleton.PROPERTY_NAME = value
			End Set
		End Property 'DataStoreGetSetProperty - END

	End Class 'DataStoreTypeFooter
End Namespace 'ClrNamespaceFooter