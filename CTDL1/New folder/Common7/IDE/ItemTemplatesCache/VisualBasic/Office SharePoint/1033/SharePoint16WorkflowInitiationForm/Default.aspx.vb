Imports System
Imports System.Collections
Imports System.Configuration
Imports System.Data
Imports System.Web
Imports System.Web.Security
Imports System.Web.UI
Imports System.Web.UI.HtmlControls
Imports System.Web.UI.WebControls
Imports System.Web.UI.WebControls.WebParts
Imports Microsoft.SharePoint.Workflow
Imports Microsoft.SharePoint
Imports Microsoft.SharePoint.WebControls
Imports Microsoft.SharePoint.Utilities

Partial Public Class $safeitemrootname$
    Inherits LayoutsPageBase

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs) Handles Me.Load
        InitializeParams()

        ' $loc_PrePopulateComment$
    End Sub

    ' $loc_GetInitDataSummary$
    Private Function GetInitiationData() As String

        ' $loc_GetInitDataComment$
        Return String.Empty
    End Function

    Protected Sub StartWorkflow_Click(ByVal sender As Object, ByVal e As System.EventArgs)
        ' $loc_StartWorkflowClickComment$
        Try
            HandleStartWorkflow()
        Catch ex As Exception
            SPUtility.TransferToErrorPage(SPHttpUtility.UrlKeyValueEncode("$loc_WorkflowFailedStartError$"))
        End Try
    End Sub

    Protected Sub Cancel_Click(ByVal sender As Object, ByVal e As System.EventArgs)
        SPUtility.Redirect("Workflow.aspx", SPRedirectFlags.RelativeToLayoutsPage, HttpContext.Current, Page.ClientQueryString)
    End Sub

#Region "$loc_InitiationCodeRegion$"

    Private associationGuid As String
    Private workflowList As SPList
    Private workflowListItem As SPListItem

    Private Sub InitializeParams()
        Try
            associationGuid = Request.Params.Item("TemplateID")

            ' $loc_SiteWorkflowComment$
            If Not String.IsNullOrEmpty(Request.Params.Item("List")) AndAlso Not String.IsNullOrEmpty(Request.Params.Item("ID")) Then
                workflowList = Web.Lists.Item(New Guid(Request.Params.Item("List")))
                workflowListItem = workflowList.GetItemById(Convert.ToInt32(Request.Params.Item("ID")))
            End If
        Catch ex As Exception
            SPUtility.TransferToErrorPage(SPHttpUtility.UrlKeyValueEncode("$loc_ParamsFailedLoadingError$"))
        End Try
    End Sub

    Private Sub HandleStartWorkflow()

        If workflowList IsNot Nothing AndAlso workflowListItem IsNot Nothing Then
            StartListWorkflow()
        Else
            StartSiteWorkflow()
        End If
    End Sub

    Private Sub StartSiteWorkflow()
        Dim association As SPWorkflowAssociation = Web.WorkflowAssociations.Item(New Guid(associationGuid))
        Web.Site.WorkflowManager.StartWorkflow(Nothing, association, GetInitiationData, SPWorkflowRunOptions.Synchronous)
        SPUtility.Redirect(Web.Url, SPRedirectFlags.UseSource, HttpContext.Current)
    End Sub

    Private Sub StartListWorkflow()
        Dim association As SPWorkflowAssociation = workflowList.WorkflowAssociations.Item(New Guid(associationGuid))
        Web.Site.WorkflowManager.StartWorkflow(workflowListItem, association, GetInitiationData)
        SPUtility.Redirect(workflowList.DefaultViewUrl, SPRedirectFlags.UseSource, HttpContext.Current)
    End Sub
#End Region
End Class
