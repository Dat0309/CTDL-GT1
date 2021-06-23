using System;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using Microsoft.SqlServer.Server;


[Serializable]
[Microsoft.SqlServer.Server.SqlUserDefinedType(Format.Native)]
public struct $safeitemname$: INullable
{
    public override string ToString()
    {
        // $ReplaceCodeComment$
        return string.Empty;
    }
    
    public bool IsNull
    {
        get
        {
            // $PutYourCodeHereComment$
            return _null;
        }
    }
    
    public static $safeitemname$ Null
    {
        get
        {
            $safeitemname$ h = new $safeitemname$();
            h._null = true;
            return h;
        }
    }
    
    public static $safeitemname$ Parse(SqlString s)
    {
        if (s.IsNull)
            return Null;
        $safeitemname$ u = new $safeitemname$();
        // $PutYourCodeHereComment$
        return u;
    }
    
    // $PlaceholderMethodComment$
    public string Method1()
    {
        // $PutYourCodeHereComment$
        return string.Empty;
    }
    
    // $PlaceholderStaticMethodComment$
    public static SqlString Method2()
    {
        // $PutYourCodeHereComment$
        return new SqlString("");
    }
    
    // $PlaceholderFieldComment$
    public int _var1;
 
    // $PrivateMemberComment$
    private bool _null;
}