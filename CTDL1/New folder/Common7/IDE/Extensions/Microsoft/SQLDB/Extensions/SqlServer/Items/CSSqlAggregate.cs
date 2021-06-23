using System;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using Microsoft.SqlServer.Server;

[Serializable]
[Microsoft.SqlServer.Server.SqlUserDefinedAggregate(Format.Native)]
public struct $safeitemname$
{
    public void Init()
    {
        // $PutYourCodeHereComment$
    }

    public void Accumulate(SqlString Value)
    {
        // $PutYourCodeHereComment$
    }

    public void Merge ($safeitemname$ Group)
    {
        // $PutYourCodeHereComment$
    }

    public SqlString Terminate ()
    {
        // $PutYourCodeHereComment$
        return new SqlString (string.Empty);
    }

    // $PlaceholderFieldComment$
    public int _var1;
}
