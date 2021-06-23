Imports System
Imports System.Data
Imports System.Data.SqlClient
Imports System.Data.SqlTypes
Imports Microsoft.SqlServer.Server

Partial Public Class UserDefinedFunctions
    <Microsoft.SqlServer.Server.SqlFunction()> _
    Public Shared Function $safeitemname$() As SqlString
        ' $PutYourCodeHereComment$
        Return New SqlString("")
    End Function
End Class
