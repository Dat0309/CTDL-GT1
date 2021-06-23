<%@ WebService Language="VB" Class="WebService1" %>

Imports System
Imports System.Web
Imports System.Web.Services
Imports System.Xml.Serialization

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
' <System.Web.Script.Services.ScriptService()> _
<WebService(Namespace := "http://tempuri.org/")> _
<WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _  
Public Class WebService1
    Inherits System.Web.Services.WebService 

    ' WEB SERVICE EXAMPLE
    ' The HelloWorld() example service returns the string Hello World.
    '
    <WebMethod()> _
    Public Function HelloWorld() As String
       Return "Hello World"
    End Function

End Class
