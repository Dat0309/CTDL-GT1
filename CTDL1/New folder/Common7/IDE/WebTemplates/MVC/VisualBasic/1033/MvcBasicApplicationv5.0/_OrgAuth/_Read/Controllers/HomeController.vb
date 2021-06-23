Imports System.Globalization
Imports System.IO
Imports System.Net
Imports System.Net.Http
Imports System.Net.Http.Headers
Imports System.Security.Claims
Imports System.Threading.Tasks
Imports Microsoft.IdentityModel.Clients.ActiveDirectory
Imports Newtonsoft.Json
Imports Newtonsoft.Json.Linq

Public Class HomeController
    Inherits Controller
    Private Const TenantIdClaimType As String = "http://schemas.microsoft.com/identity/claims/tenantid"
    Private Const LoginUrl As String = "https://login.windows.net/{0}"
    Private Const GraphUrl As String = "https://graph.windows.net"
    Private Const GraphUserUrl As String = "https://graph.windows.net/{0}/users/{1}?api-version=2013-04-05"
    Private Shared ReadOnly AppPrincipalId As String = ConfigurationManager.AppSettings("ida:ClientID")
    Private Shared ReadOnly AppKey As String = ConfigurationManager.AppSettings("ida:Password")

    Public Function Index() As ActionResult
        Return View()
    End Function

    Public Function About() As ActionResult
        ViewBag.Message = "Your application description page."

        Return View()
    End Function

    Public Function Contact() As ActionResult
        ViewBag.Message = "Your contact page."

        Return View()
    End Function

    <Authorize>
    Public Async Function UserProfile() As Task(Of ActionResult)
        Dim tenantId As String = ClaimsPrincipal.Current.FindFirst(TenantIdClaimType).Value

        ' Get a token for calling the Windows Azure Active Directory Graph
        Dim authContext As New AuthenticationContext([String].Format(CultureInfo.InvariantCulture, LoginUrl, tenantId))
        Dim credential As New ClientCredential(AppPrincipalId, AppKey)
        Dim assertionCredential As AuthenticationResult = authContext.AcquireToken(GraphUrl, credential)
        Dim authHeader As String = assertionCredential.CreateAuthorizationHeader()
        Dim requestUrl As String = [String].Format(CultureInfo.InvariantCulture, GraphUserUrl, HttpUtility.UrlEncode(tenantId), HttpUtility.UrlEncode(User.Identity.Name))

        Dim client As New HttpClient()
        Dim request As New HttpRequestMessage(HttpMethod.[Get], requestUrl)
        request.Headers.TryAddWithoutValidation("Authorization", authHeader)
        Dim response As HttpResponseMessage = Await client.SendAsync(request)
        Dim responseString As String = Await response.Content.ReadAsStringAsync()
        Dim profile As UserProfile = JsonConvert.DeserializeObject(Of UserProfile)(responseString)

        Return View(profile)
    End Function
End Class
