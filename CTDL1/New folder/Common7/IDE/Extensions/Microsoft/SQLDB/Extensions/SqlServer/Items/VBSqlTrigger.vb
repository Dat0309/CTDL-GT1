Imports System
Imports System.Data
Imports System.Data.SqlClient
Imports System.Data.SqlTypes
Imports Microsoft.SqlServer.Server


Partial Public Class Triggers
    ' $SqlClrTriggerComment$
    ' <Microsoft.SqlServer.Server.SqlTrigger(Name:="$safeitemname$", Target:="Table1", Event:="FOR UPDATE")> _
    Public Shared Sub  $safeitemname$ ()
        ' $ReplaceCodeComment$
        SqlContext.Pipe.Send("$TriggerFiredString$")
    End Sub
End Class
