Imports Microsoft.SharePoint.Client
Imports System
Imports System.Collections.Generic
Imports System.Linq
Imports System.Web
Imports System.Web.Mvc

Namespace Controllers
    Public Class HomeController
        Inherits Controller

        <SharePointContextFilter>
        Public Function Index() As ActionResult
            Dim spUser As User = Nothing

            Dim spContext = SharePointContextProvider.Current.GetSharePointContext(HttpContext)

            Using clientContext = spContext.CreateUserClientContextForSPHost()
                If clientContext IsNot Nothing Then
                    spUser = clientContext.Web.CurrentUser

                    clientContext.Load(spUser, Function(user) user.Title)

                    clientContext.ExecuteQuery()

                    ViewBag.UserName = spUser.Title
                End If
            End Using

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
    End Class
End Namespace
