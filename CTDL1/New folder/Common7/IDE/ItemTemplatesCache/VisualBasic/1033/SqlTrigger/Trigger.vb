Imports System
Imports System.Data
Imports System.Data.SqlClient
Imports System.Data.SqlTypes
Imports Microsoft.SqlServer.Server


Partial Public Class Triggers
    ' Enter existing table or view for the target and uncomment the attribute line
    ' <Microsoft.SqlServer.Server.SqlTrigger(Name:="$safeitemname$", Target:="Table1", Event:="FOR UPDATE")> _
    Public Shared Sub  $safeitemname$ ()
        ' Replace with your own code
        SqlContext.Pipe.Send("Trigger FIRED")
    End Sub
End Class
