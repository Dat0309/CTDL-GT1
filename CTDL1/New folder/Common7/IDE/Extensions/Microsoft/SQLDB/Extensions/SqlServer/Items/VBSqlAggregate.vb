Imports System
Imports System.Data
Imports System.Data.SqlClient
Imports System.Data.SqlTypes
Imports Microsoft.SqlServer.Server


<Serializable()> _
<Microsoft.SqlServer.Server.SqlUserDefinedAggregate(Format.Native)> _
Public Structure $safeitemname$

    Public Sub Init()
        ' $PutYourCodeHereComment$
    End Sub

    Public Sub Accumulate(ByVal value As SqlString)
        ' $PutYourCodeHereComment$
    End Sub

    Public Sub Merge(ByVal value as $safeitemname$)
        ' Put your code here
    End Sub

    Public Function Terminate() As SqlString
        ' $PutYourCodeHereComment$
        Return New SqlString("")
    End Function

    ' $PlaceholderFieldComment$
    Private var1 As Integer

End Structure

