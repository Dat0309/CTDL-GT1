using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.SqlServer.Server;

public partial class Triggers
{        
    // $SqlClrTriggerComment$
    // [Microsoft.SqlServer.Server.SqlTrigger (Name="$safeitemname$", Target="Table1", Event="FOR UPDATE")]
    public static void $safeitemname$ ()
    {
	    // $ReplaceCodeComment$
	    SqlContext.Pipe.Send("$TriggerFiredString$");
    }
}

