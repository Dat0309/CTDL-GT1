Imports System
Imports System.Collections.Generic
Imports System.Linq
Imports System.Text

''' <summary>
''' $loc_Entity1Summary1$
''' $loc_Entity1Summary2$
''' </summary>
Partial Public Class Entity1
    Private _identifier1 As String
    Private _message As String

    '$loc_Entity1TodoComment$
    Public Property Identifier1() As String
        Get
            Return _identifier1
        End Get
        Set(ByVal value As String)
            _identifier1 = value
        End Set
    End Property

    Public Property Message() As String
        Get
            Return _message
        End Get
        Set(ByVal value As String)
            _message = value
        End Set
    End Property
End Class
