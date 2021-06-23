Imports Microsoft.IdentityModel.Clients.ActiveDirectory
Imports Newtonsoft.Json.Linq
Imports System
Imports System.Collections.Generic
Imports System.Configuration
Imports System.Globalization
Imports System.IO
Imports System.Linq
Imports System.Net
Imports System.Security.Claims
Imports System.Web
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports System.Net.Http
Imports Newtonsoft.Json
Imports System.Threading.Tasks
Imports $safeprojectname$
Imports $safeprojectname$.Models

Partial Public Class UserInfo
    Inherits System.Web.UI.Page
    Private Const TenantIdClaimType As String = "http://schemas.microsoft.com/identity/claims/tenantid"
    Private Const LoginUrl As String = "https://login.windows.net/{0}"
    Private Const GraphUrl As String = "https://graph.windows.net"
    Private Const GraphUserUrl As String = "https://graph.windows.net/{0}/users/{1}?api-version=2013-04-05"
    Private Shared ReadOnly AppPrincipalId As String = ConfigurationManager.AppSettings("ida:ClientID")
    Private Shared ReadOnly AppKey As String = ConfigurationManager.AppSettings("ida:Password")


    Protected Sub Page_Load(sender As Object, e As EventArgs)
        RegisterAsyncTask(New PageAsyncTask(AddressOf GetUserData))
    End Sub

    Public Async Function GetUserData() As Task

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
        UserData.DataSource = New List(Of UserProfile) From {profile}
        UserData.DataBind()

    End Function
End Class