<%@ WebHandler Language="C#" Class="GenericHandler1" %>

using System;
using System.Web;

public class GenericHandler1 : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        context.Response.Write("Hello World");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}