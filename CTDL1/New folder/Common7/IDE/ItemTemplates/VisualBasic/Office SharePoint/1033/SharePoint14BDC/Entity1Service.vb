Imports System
Imports System.Collections.Generic
Imports System.Linq
Imports System.Text

''' <summary>
''' $loc_Entity1ServiceSummary1$
''' $loc_Entity1ServiceSummary2$
''' </summary>
Public Class Entity1Service
    ''' <summary>
    ''' $loc_Entity1ServiceReadItemSummary$
    ''' $loc_Entity1ServiceFunctionSummary$
    ''' </summary>
    ''' <param name="id"></param>
    ''' <returns>Entity1</returns>
    Public Shared Function ReadItem(ByVal id As String) As Entity1
        '$loc_Entity1ServiceFunctionTodoComment$
        Dim entity1 As New Entity1()
        entity1.Identifier1 = id
        entity1.Message = "Hello World"
        Return entity1
    End Function

    ''' <summary>
    ''' $loc_Entity1ServiceReadListSummary$
    ''' $loc_Entity1ServiceFunctionSummary$
    ''' </summary>
    ''' <returns>$loc_Entity1ServiceReadListReturns$</returns>
    Public Shared Function ReadList() As IEnumerable(Of Entity1)
        '$loc_Entity1ServiceFunctionTodoComment$
        Dim entity1 As New Entity1()
        entity1.Identifier1 = "0"
        entity1.Message = "Hello World"
        Dim myEntityList As Entity1() = {entity1}
        Return myEntityList
    End Function
End Class
