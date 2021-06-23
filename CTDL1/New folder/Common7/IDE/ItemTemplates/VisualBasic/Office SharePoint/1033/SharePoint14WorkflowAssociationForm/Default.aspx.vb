Imports Microsoft.SharePoint.Utilities
Imports Microsoft.SharePoint.WebControls
Imports Microsoft.SharePoint.Workflow
Imports System.Globalization
Imports System.Web

Partial Public Class $safeitemrootname$
    Inherits LayoutsPageBase

    Private Const CreateListTryCount As Integer = 100
    Private historyListDescription As String = "$loc_HistoryListDescription$"
    Private taskListDescription As String = "$loc_TaskListDescription$"
    Private listCreationFailed As String = "$loc_ListCreationError$"
    Private workflowAssociationFailed As String = "$loc_AssociationFailedError$"

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs) Handles Me.Load
        InitializeParams()
    End Sub

    Private Sub PopulateFormFields(ByVal existingAssociation As SPWorkflowAssociation)

        ' $loc_PrePopulateComment$
    End Sub

    ' $loc_GetAssocDataSummary$
    Private Function GetAssociationData() As String

        ' $loc_GetAssocDataComment$
        Return String.Empty
    End Function

    Protected Sub AssociateWorkflow_Click(ByVal sender As Object, ByVal e As System.EventArgs)
        ' $loc_AssociateWorkflowClickComment$
        Try
            CreateHistoryList()
            CreateTaskList()
            HandleAssociateWorkflow()
            SPUtility.Redirect("WrkSetng.aspx", SPRedirectFlags.RelativeToLayoutsPage, HttpContext.Current, Page.ClientQueryString)
        Catch ex As Exception
            SPUtility.TransferToErrorPage(String.Format(CultureInfo.CurrentCulture, workflowAssociationFailed, ex.Message))
        End Try
    End Sub

    Protected Sub Cancel_Click(ByVal sender As Object, ByVal e As System.EventArgs)
        SPUtility.Redirect("WrkSetng.aspx", SPRedirectFlags.RelativeToLayoutsPage, HttpContext.Current, Page.ClientQueryString)
    End Sub

#Region "$loc_AssociationCodeRegion$"

    Private WorkflowAssociationParams As AssociationParams

    <Serializable()> Private Enum WorkflowAssociationType
        ListAssociation
        WebAssociation
        ListContentTypeAssociation
        SiteContentTypeAssociation
    End Enum

    <Serializable()> Private Structure AssociationParams
        Public AssociationName As String
        Public BaseTemplate As String
        Public AutoStartCreate As Boolean
        Public AutoStartChange As Boolean
        Public AllowManual As Boolean
        Public RequireManagedListPermisions As Boolean
        Public SetDefaultApprovalWorkflow As Boolean
        Public LockItem As Boolean
        Public AssociationGuid As Guid
        Public AssociationType As WorkflowAssociationType
        Public TargetListGuid As Guid
        Public TaskListGuid As Guid
        Public TaskListName As String
        Public HistoryListGuid As Guid
        Public HistoryListName As String
        Public ContentTypeId As SPContentTypeId
        Public ContentTypePushDown As Boolean
    End Structure

    Private Sub InitializeParams()
        ' $loc_IfFirstLoadComment$
        If ViewState.Item("associationParams") Is Nothing Then
            InitializeAssociationParams()
            ViewState.Item("associationParams") = WorkflowAssociationParams
            Dim existingAssociation As SPWorkflowAssociation = GetExistingAssociation()
            PopulateFormFields(existingAssociation)
        Else
            WorkflowAssociationParams = CType(ViewState.Item("associationParams"), AssociationParams)
        End If
    End Sub

    Private Sub InitializeAssociationParams()
        WorkflowAssociationParams = New AssociationParams
        WorkflowAssociationParams.AssociationName = Request.Params.Item("WorkflowName")
        WorkflowAssociationParams.BaseTemplate = Request.Params.Item("WorkflowDefinition")
        WorkflowAssociationParams.AutoStartCreate = (StringComparer.OrdinalIgnoreCase.Compare(Request.Params.Item("AutoStartCreate"), "ON") = 0)
        WorkflowAssociationParams.AutoStartChange = (StringComparer.OrdinalIgnoreCase.Compare(Request.Params.Item("AutoStartChange"), "ON") = 0)
        WorkflowAssociationParams.AllowManual = (StringComparer.OrdinalIgnoreCase.Compare(Request.Params.Item("AllowManual"), "ON") = 0)
        WorkflowAssociationParams.RequireManagedListPermisions = (StringComparer.OrdinalIgnoreCase.Compare(Request.Params.Item("ManualPermManageListRequired"), "ON") = 0)
        WorkflowAssociationParams.SetDefaultApprovalWorkflow = (StringComparer.OrdinalIgnoreCase.Compare(Request.Params.Item("SetDefault"), "ON") = 0)
        WorkflowAssociationParams.LockItem = (StringComparer.OrdinalIgnoreCase.Compare(Request.Params.Item("AllowEdits"), "FALSE") = 0)
        WorkflowAssociationParams.ContentTypePushDown = (StringComparer.OrdinalIgnoreCase.Compare(Request.Params.Item("UpdateLists"), "TRUE") = 0)

        Dim associationGuid = Request.Params.Item("GuidAssoc")
        If Not String.IsNullOrEmpty(associationGuid) Then
            WorkflowAssociationParams.AssociationGuid = New Guid(associationGuid)
        End If

        InitializeAssociationTypeParams()
        InitializeTaskListParams()
        InitializeHistoryListParams()
    End Sub

    Private Sub InitializeAssociationTypeParams()
        Dim listGuid As String = Request.Params.Item("List")
        Dim contentTypeId As String = Request.Params.Item("ctype")

        If Not String.IsNullOrEmpty(contentTypeId) Then
            If Not String.IsNullOrEmpty(listGuid) Then
                WorkflowAssociationParams.AssociationType = WorkflowAssociationType.ListContentTypeAssociation
                WorkflowAssociationParams.TargetListGuid = New Guid(listGuid)
            Else
                WorkflowAssociationParams.AssociationType = WorkflowAssociationType.SiteContentTypeAssociation
            End If
            WorkflowAssociationParams.ContentTypeId = New SPContentTypeId(contentTypeId)
        Else
            If Not String.IsNullOrEmpty(listGuid) Then
                WorkflowAssociationParams.AssociationType = WorkflowAssociationType.ListAssociation
                WorkflowAssociationParams.TargetListGuid = New Guid(listGuid)
            Else
                WorkflowAssociationParams.AssociationType = WorkflowAssociationType.WebAssociation
            End If
        End If
    End Sub

    Private Sub InitializeTaskListParams()
        Dim taskListParam As String = Request.Params.Item("TaskList")

        If WorkflowAssociationParams.AssociationType = WorkflowAssociationType.SiteContentTypeAssociation Then
            WorkflowAssociationParams.TaskListName = taskListParam
        Else
            If taskListParam.StartsWith("z", StringComparison.OrdinalIgnoreCase) Then
                ' $loc_CreateNewListComment$
                WorkflowAssociationParams.TaskListName = taskListParam.Substring(1)
            Else
                ' $loc_UseExistingListComment$
                WorkflowAssociationParams.TaskListGuid = New Guid(taskListParam)
            End If
        End If
    End Sub

    Private Sub InitializeHistoryListParams()
        Dim historyListParam As String = Request.Params.Item("HistoryList")
        If WorkflowAssociationParams.AssociationType = WorkflowAssociationType.SiteContentTypeAssociation Then
            WorkflowAssociationParams.HistoryListName = historyListParam
        Else
            If historyListParam.StartsWith("z", StringComparison.OrdinalIgnoreCase) Then
                ' $loc_CreateNewListComment$
                WorkflowAssociationParams.HistoryListName = historyListParam.Substring(1)
            Else
                ' $loc_UseExistingListComment$
                WorkflowAssociationParams.HistoryListGuid = New Guid(historyListParam)
            End If
        End If
    End Sub

   Private Function GetExistingAssociation() As SPWorkflowAssociation
        If WorkflowAssociationParams.AssociationGuid <> Guid.Empty Then
            Dim workflowAssociationCollection As SPWorkflowAssociationCollection
            If WorkflowAssociationParams.AssociationType = WorkflowAssociationType.ListAssociation Then
                workflowAssociationCollection = Web.Lists.Item(WorkflowAssociationParams.TargetListGuid).WorkflowAssociations
            ElseIf WorkflowAssociationParams.AssociationType = WorkflowAssociationType.ListContentTypeAssociation Then
                workflowAssociationCollection = Web.Lists.Item(WorkflowAssociationParams.TargetListGuid).ContentTypes.Item(WorkflowAssociationParams.ContentTypeId).WorkflowAssociations
            ElseIf WorkflowAssociationParams.AssociationType = WorkflowAssociationType.SiteContentTypeAssociation Then
                workflowAssociationCollection = Web.ContentTypes.Item(WorkflowAssociationParams.ContentTypeId).WorkflowAssociations()
            Else
                workflowAssociationCollection = Web.WorkflowAssociations
            End If
            Return workflowAssociationCollection.Item(WorkflowAssociationParams.AssociationGuid)
        End If
        Return Nothing
    End Function

    Private Sub CreateTaskList()
        If WorkflowAssociationParams.TaskListGuid = Guid.Empty And WorkflowAssociationParams.AssociationType <> WorkflowAssociationType.SiteContentTypeAssociation Then
            WorkflowAssociationParams.TaskListGuid = CreateList(WorkflowAssociationParams.TaskListName, taskListDescription, SPListTemplateType.Tasks)
        End If
    End Sub

    Private Sub CreateHistoryList()
        If WorkflowAssociationParams.HistoryListGuid = Guid.Empty And WorkflowAssociationParams.AssociationType <> WorkflowAssociationType.SiteContentTypeAssociation Then
            WorkflowAssociationParams.HistoryListGuid = CreateList(WorkflowAssociationParams.HistoryListName, historyListDescription, SPListTemplateType.WorkflowHistory)
        End If
    End Sub

    Private Function CreateList(ByVal name As String, ByVal description As String, ByVal type As SPListTemplateType) As Guid
        Dim listName As String = name
        For i As Integer = 0 To CreateListTryCount
            If Web.Lists.TryGetList(listName) Is Nothing Then
                Return Web.Lists.Add(listName, description, type)
            End If
            listName = String.Concat(name, i.ToString(CultureInfo.InvariantCulture))
        Next i
        Throw New Exception(String.Format(CultureInfo.CurrentCulture, listCreationFailed, name))
    End Function

    Private Sub HandleAssociateWorkflow()
        If WorkflowAssociationParams.AssociationType = WorkflowAssociationType.ListAssociation Then
            AssociateListWorkflow()
        ElseIf WorkflowAssociationParams.AssociationType = WorkflowAssociationType.WebAssociation Then
            AssociateSiteWorkflow()
        ElseIf WorkflowAssociationParams.AssociationType = WorkflowAssociationType.ListContentTypeAssociation Then
            AssociateListContentTypeWorkflow()
        ElseIf WorkflowAssociationParams.AssociationType = WorkflowAssociationType.SiteContentTypeAssociation Then
            AssociateSiteContentTypeWorkflow()
        End If
    End Sub

        Private Sub AssociateSiteContentTypeWorkflow()
        Dim contentType As SPContentType = Web.ContentTypes.Item(WorkflowAssociationParams.ContentTypeId)
        Dim association As SPWorkflowAssociation

        If WorkflowAssociationParams.AssociationGuid = Guid.Empty Then
            association = SPWorkflowAssociation.CreateWebContentTypeAssociation(Web.WorkflowTemplates.Item(New Guid(WorkflowAssociationParams.BaseTemplate)), _
                                                                                WorkflowAssociationParams.AssociationName, _
                                                                                WorkflowAssociationParams.TaskListName, _
                                                                                WorkflowAssociationParams.HistoryListName)
            PopulateAssociationParams(association)
            contentType.WorkflowAssociations.Add(association)
        Else
            association = contentType.WorkflowAssociations.Item(WorkflowAssociationParams.AssociationGuid)
            association.TaskListTitle = WorkflowAssociationParams.TaskListName
            association.HistoryListTitle = WorkflowAssociationParams.HistoryListName
            PopulateAssociationParams(association)
            contentType.WorkflowAssociations.Update(association)
        End If

        If WorkflowAssociationParams.ContentTypePushDown Then
            contentType.UpdateWorkflowAssociationsOnChildren(False)
        End If
    End Sub

    Private Sub AssociateListContentTypeWorkflow()
        Dim contentType As SPContentType = Web.Lists.Item(WorkflowAssociationParams.TargetListGuid).ContentTypes.Item(WorkflowAssociationParams.ContentTypeId)
        Dim association As SPWorkflowAssociation

        If WorkflowAssociationParams.AssociationGuid = Guid.Empty Then
            association = SPWorkflowAssociation.CreateListContentTypeAssociation(Web.WorkflowTemplates.Item(New Guid(WorkflowAssociationParams.BaseTemplate)), _
                                                                                 WorkflowAssociationParams.AssociationName, _
                                                                                 Web.Lists.Item(WorkflowAssociationParams.TaskListGuid), _
                                                                                 Web.Lists.Item(WorkflowAssociationParams.HistoryListGuid))
            PopulateAssociationParams(association)
            contentType.WorkflowAssociations.Add(association)
        Else
            association = contentType.WorkflowAssociations.Item(WorkflowAssociationParams.AssociationGuid)
            association.SetTaskList(Web.Lists.Item(WorkflowAssociationParams.TaskListGuid))
            association.SetHistoryList(Web.Lists.Item(WorkflowAssociationParams.HistoryListGuid))
            PopulateAssociationParams(association)
            contentType.WorkflowAssociations.Update(association)
        End If

        If WorkflowAssociationParams.ContentTypePushDown Then            
            contentType.UpdateWorkflowAssociationsOnChildren(false)
        End If
    End Sub

    Private Sub AssociateListWorkflow()
        Dim targetList As SPList = Web.Lists.Item(WorkflowAssociationParams.TargetListGuid)
        Dim association As SPWorkflowAssociation
        If WorkflowAssociationParams.AssociationGuid = Guid.Empty Then
            association = SPWorkflowAssociation.CreateListAssociation(Web.WorkflowTemplates.Item(New Guid(WorkflowAssociationParams.BaseTemplate)), _
                                                                      WorkflowAssociationParams.AssociationName, _
                                                                      Web.Lists.Item(WorkflowAssociationParams.TaskListGuid), _
                                                                      Web.Lists.Item(WorkflowAssociationParams.HistoryListGuid))
            PopulateAssociationParams(association)
            targetList.WorkflowAssociations.Add(association)
        Else
            association = targetList.WorkflowAssociations.Item(WorkflowAssociationParams.AssociationGuid)
            association.SetTaskList(Web.Lists.Item(WorkflowAssociationParams.TaskListGuid))
            association.SetHistoryList(Web.Lists.Item(WorkflowAssociationParams.HistoryListGuid))
            PopulateAssociationParams(association)
            targetList.WorkflowAssociations.Update(association)
        End If

        SetDefaultContentApprovalWorkflow(targetList, association)
    End Sub

    Private Sub SetDefaultContentApprovalWorkflow(ByVal targetList As SPList, ByVal association As SPWorkflowAssociation)
        If targetList.EnableMinorVersions Then
            If targetList.DefaultContentApprovalWorkflowId <> association.Id And WorkflowAssociationParams.SetDefaultApprovalWorkflow Then
                If Not targetList.EnableModeration Then
                    targetList.EnableModeration = True
                    targetList.DraftVersionVisibility = DraftVisibilityType.Approver
                End If
                targetList.DefaultContentApprovalWorkflowId = association.Id
                targetList.Update()
            ElseIf targetList.DefaultContentApprovalWorkflowId = association.Id And Not WorkflowAssociationParams.SetDefaultApprovalWorkflow Then
                targetList.DefaultContentApprovalWorkflowId = Guid.Empty
                targetList.Update()
            End If
        End If
    End Sub

    Private Sub AssociateSiteWorkflow()
        Dim association As SPWorkflowAssociation
        If WorkflowAssociationParams.AssociationGuid = Guid.Empty Then
            association = SPWorkflowAssociation.CreateWebAssociation(Web.WorkflowTemplates.Item(New Guid(WorkflowAssociationParams.BaseTemplate)), _
                                                                      WorkflowAssociationParams.AssociationName, _
                                                                      Web.Lists.Item(WorkflowAssociationParams.TaskListGuid), _
                                                                      Web.Lists.Item(WorkflowAssociationParams.HistoryListGuid))
            PopulateAssociationParams(association)
            Web.WorkflowAssociations.Add(association)
        Else
            association = Web.WorkflowAssociations.Item(WorkflowAssociationParams.AssociationGuid)
            association.SetTaskList(Web.Lists.Item(WorkflowAssociationParams.TaskListGuid))
            association.SetHistoryList(Web.Lists.Item(WorkflowAssociationParams.HistoryListGuid))
            PopulateAssociationParams(association)
            Web.WorkflowAssociations.Update(association)
        End If
    End Sub

    Private Sub PopulateAssociationParams(ByVal association As SPWorkflowAssociation)
        association.Name = WorkflowAssociationParams.AssociationName
        association.AutoStartCreate = WorkflowAssociationParams.AutoStartCreate
        association.AutoStartChange = WorkflowAssociationParams.AutoStartChange
        association.AllowManual = WorkflowAssociationParams.AllowManual
        association.LockItem = WorkflowAssociationParams.LockItem
        association.ContentTypePushDown = WorkflowAssociationParams.ContentTypePushDown

        If association.AllowManual Then
            association.PermissionsManual = SPBasePermissions.EmptyMask
            If WorkflowAssociationParams.RequireManagedListPermisions Then
                If WorkflowAssociationParams.TargetListGuid <> Guid.Empty Then
                    association.PermissionsManual = association.PermissionsManual Or SPBasePermissions.ManageLists
                Else
                    association.PermissionsManual = association.PermissionsManual Or SPBasePermissions.ManageWeb
                End If
            End If
        End If

        association.AssociationData = GetAssociationData()
    End Sub
#End Region

End Class

