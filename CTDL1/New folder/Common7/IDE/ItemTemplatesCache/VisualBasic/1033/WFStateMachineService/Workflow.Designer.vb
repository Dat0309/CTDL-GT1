<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial class $safeitemrootname$

    'NOTE: The following procedure is required by the Workflow Designer
    'It can be modified using the Workflow Designer. 
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerNonUserCode()> _
    <System.CodeDom.Compiler.GeneratedCode("","")> _
    Private Sub InitializeComponent()
        Me.CanModifyActivities = True
        Dim activitybind1 As System.Workflow.ComponentModel.ActivityBind = New System.Workflow.ComponentModel.ActivityBind
        Dim workflowparameterbinding1 As System.Workflow.ComponentModel.WorkflowParameterBinding = New System.Workflow.ComponentModel.WorkflowParameterBinding
        Dim activitybind2 As System.Workflow.ComponentModel.ActivityBind = New System.Workflow.ComponentModel.ActivityBind
        Dim workflowparameterbinding2 As System.Workflow.ComponentModel.WorkflowParameterBinding = New System.Workflow.ComponentModel.WorkflowParameterBinding
        Dim typedoperationinfo1 As System.Workflow.Activities.TypedOperationInfo = New System.Workflow.Activities.TypedOperationInfo
        Dim workflowserviceattributes1 As System.Workflow.Activities.WorkflowServiceAttributes = New System.Workflow.Activities.WorkflowServiceAttributes
        Me.setStateActivity1 = New System.Workflow.Activities.SetStateActivity
        Me.receiveActivity1 = New System.Workflow.Activities.ReceiveActivity
        Me.eventDrivenActivity1 = New System.Workflow.Activities.EventDrivenActivity
        Me.stateActivity1 = New System.Workflow.Activities.StateActivity
        Me.$safeitemrootname$InitialState = New System.Workflow.Activities.StateActivity
        '
        'setStateActivity1
        '
        Me.setStateActivity1.Name = "setStateActivity1"
        Me.setStateActivity1.TargetStateName = "stateActivity1"
        '
        'receiveActivity1
        '
        Me.receiveActivity1.CanCreateInstance = True
        Me.receiveActivity1.Name = "receiveActivity1"
        activitybind1.Name = "$safeitemrootname$"
        activitybind1.Path = "ReturnValue"
        workflowparameterbinding1.ParameterName = "(ReturnValue)"
        workflowparameterbinding1.SetBinding(System.Workflow.ComponentModel.WorkflowParameterBinding.ValueProperty, CType(activitybind1, System.Workflow.ComponentModel.ActivityBind))
        activitybind2.Name = "$safeitemrootname$"
        activitybind2.Path = "InputValue"
        workflowparameterbinding2.ParameterName = "value"
        workflowparameterbinding2.SetBinding(System.Workflow.ComponentModel.WorkflowParameterBinding.ValueProperty, CType(activitybind2, System.Workflow.ComponentModel.ActivityBind))
        Me.receiveActivity1.ParameterBindings.Add(workflowparameterbinding1)
        Me.receiveActivity1.ParameterBindings.Add(workflowparameterbinding2)
        typedoperationinfo1.ContractType = GetType($rootnamespace$.$contractName$)
        typedoperationinfo1.Name = "GetData"
        Me.receiveActivity1.ServiceOperationInfo = typedoperationinfo1
        '
        'eventDrivenActivity1
        '
        Me.eventDrivenActivity1.Activities.Add(Me.receiveActivity1)
        Me.eventDrivenActivity1.Activities.Add(Me.setStateActivity1)
        Me.eventDrivenActivity1.Name = "eventDrivenActivity1"
        '
        'stateActivity1
        '
        Me.stateActivity1.Name = "stateActivity1"
        '
        '$safeitemrootname$InitialState
        '
        Me.$safeitemrootname$InitialState.Activities.Add(Me.eventDrivenActivity1)
        Me.$safeitemrootname$InitialState.Name = "$safeitemrootname$InitialState"
        workflowserviceattributes1.ConfigurationName = "$safeitemrootname$"
        workflowserviceattributes1.Name = "$safeitemrootname$"
        '
        '$safeitemrootname$
        '
        Me.Activities.Add(Me.$safeitemrootname$InitialState)
        Me.Activities.Add(Me.stateActivity1)
        Me.CompletedStateName = "stateActivity1"
        Me.DynamicUpdateCondition = Nothing
        Me.InitialStateName = "$safeitemrootname$InitialState"
        Me.Name = "$safeitemrootname$"
        Me.SetValue(System.Workflow.Activities.ReceiveActivity.WorkflowServiceAttributesProperty, workflowserviceattributes1)
        Me.CanModifyActivities = False

    End Sub
    Private eventDrivenActivity1 As System.Workflow.Activities.EventDrivenActivity
    Private setStateActivity1 As System.Workflow.Activities.SetStateActivity
    Private stateActivity1 As System.Workflow.Activities.StateActivity
    Private receiveActivity1 As System.Workflow.Activities.ReceiveActivity
    Private $safeitemrootname$InitialState As System.Workflow.Activities.StateActivity


End Class
