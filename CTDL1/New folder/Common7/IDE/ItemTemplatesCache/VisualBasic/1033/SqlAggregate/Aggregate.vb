Imports System
Imports System.Data
Imports System.Data.SqlClient
Imports System.Data.SqlTypes
Imports Microsoft.SqlServer.Server


<Serializable()> _
<Microsoft.SqlServer.Server.SqlUserDefinedAggregate(Format.Native)> _
Public Structure $safeitemname$

    Public Sub Init()
        ' Put your code here
    End Sub

    Public Sub Accumulate(ByVal value As SqlString)
        ' Put your code here
    End Sub

    Public Sub Merge(ByVal value as $safeitemname$)
        ' Put your code here
    End Sub

    Public Function Terminate() As SqlString
        ' Put your code here
        Return New SqlString("")
    End Function

    ' This is a place-holder field member
    Private var1 As Integer

End Structure

