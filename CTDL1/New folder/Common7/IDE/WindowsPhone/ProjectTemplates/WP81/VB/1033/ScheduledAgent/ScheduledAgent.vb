Imports System.Diagnostics
Imports Microsoft.Phone.Scheduler

Public Class ScheduledAgent
    Inherits ScheduledTaskAgent

    ''' <remarks>
    ''' ScheduledAgent constructor, initializes the UnhandledException handler
    ''' </remarks>
    Shared Sub New()

        ' Subscribe to the managed exception handler
        Deployment.Current.Dispatcher.BeginInvoke(
        Sub()
            AddHandler Application.Current.UnhandledException, AddressOf UnhandledException
        End Sub)

    End Sub

    ' Code to execute on Unhandled Exceptions
    Private Shared Sub UnhandledException(ByVal sender As Object, ByVal e As ApplicationUnhandledExceptionEventArgs)

        If Debugger.IsAttached Then
            ' An unhandled exception has occurred break into the debugger
            Debugger.Break()
        End If

    End Sub

    ''' <summary>
    ''' Agent that runs a scheduled task
    ''' </summary>
    ''' <param name="task">
    ''' The invoked task
    ''' </param>
    ''' <remarks>
    ''' This method is called when a periodic or resource intensive task is invoked
    ''' </remarks>
    Protected Overrides Sub OnInvoke(Task As ScheduledTask)

        'TODO: Add code to perform your task in background

        NotifyComplete()

    End Sub
End Class