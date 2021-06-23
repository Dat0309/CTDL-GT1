
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class $ProjectItemClassName$

    '$loc_Comment7$
    '$loc_Comment8$
    '$loc_Comment9$
    <System.Diagnostics.DebuggerNonUserCode()> _
    Private Sub InitializeComponent()
        Me.CanModifyActivities = True
        Dim correlationtoken1 As System.Workflow.Runtime.CorrelationToken = New System.Workflow.Runtime.CorrelationToken
        Dim activitybind1 As System.Workflow.ComponentModel.ActivityBind = New System.Workflow.ComponentModel.ActivityBind
        Me.onWorkflowActivated1 = New Microsoft.SharePoint.WorkflowActions.OnWorkflowActivated
        Me.eventDrivenActivity1 = New System.Workflow.Activities.EventDrivenActivity
        Me.$ProjectItemClassName$InitialState = New System.Workflow.Activities.StateActivity
        '
        'onWorkflowActivated1
        '
        correlationtoken1.Name = "workflowToken"
        correlationtoken1.OwnerActivityName = "$ProjectItemClassName$"
        Me.onWorkflowActivated1.CorrelationToken = correlationtoken1
        Me.onWorkflowActivated1.EventName = "OnWorkflowActivated"
        Me.onWorkflowActivated1.Name = "onWorkflowActivated1"
        Me.onWorkflowActivated1.WorkflowId = New System.Guid("00000000-0000-0000-0000-000000000000")
        activitybind1.Name = "$ProjectItemClassName$"
        activitybind1.Path = "workflowProperties"
        Me.onWorkflowActivated1.SetBinding(Microsoft.SharePoint.WorkflowActions.OnWorkflowActivated.WorkflowPropertiesProperty, CType(activitybind1, System.Workflow.ComponentModel.ActivityBind))
        '
        'eventDrivenActivity1
        '
        Me.eventDrivenActivity1.Activities.Add(Me.onWorkflowActivated1)
        Me.eventDrivenActivity1.Name = "eventDrivenActivity1"
        '
        '$ProjectItemClassName$InitialState
        '
        Me.$ProjectItemClassName$InitialState.Activities.Add(Me.eventDrivenActivity1)
        Me.$ProjectItemClassName$InitialState.Name = "$ProjectItemClassName$InitialState"
        '
        '$ProjectItemClassName$
        '
        Me.Activities.Add(Me.$ProjectItemClassName$InitialState)
        Me.CompletedStateName = Nothing
        Me.DynamicUpdateCondition = Nothing
        Me.InitialStateName = "$ProjectItemClassName$InitialState"
        Me.Name = "$ProjectItemClassName$"
        Me.CanModifyActivities = False

    End Sub

    Private WithEvents onWorkflowActivated1 As Microsoft.SharePoint.WorkflowActions.OnWorkflowActivated
    Private WithEvents eventDrivenActivity1 As System.Workflow.Activities.EventDrivenActivity
    Private WithEvents $ProjectItemClassName$InitialState As System.Workflow.Activities.StateActivity

End Class
