Imports Microsoft.SharePoint.Client
Imports Microsoft.SharePoint.Client.EventReceivers

Public Class $safeitemrootname$
    Implements IRemoteEventService

$if$ ("$safeitemrootname$" == "AppEventReceiver")    ''' <summary>
    ''' $loc_service_comment1$
    ''' </summary>
    ''' <param name="properties">$loc_service_comment2$</param>
    ''' <returns>$loc_service_comment3$</returns>
    Public Function ProcessEvent(ByVal properties As SPRemoteEventProperties) As SPRemoteEventResult Implements IRemoteEventService.ProcessEvent
        Dim result As New SPRemoteEventResult()

        Using clientContext As ClientContext = TokenHelper.CreateAppEventClientContext(properties, useAppWeb:=False)
            If clientContext IsNot Nothing Then
                clientContext.Load(clientContext.Web)
                clientContext.ExecuteQuery()
            End If
        End Using

        Return result
    End Function

    ''' <summary>
    ''' $loc_service_comment4$
    ''' </summary>
    ''' <param name="properties">$loc_service_comment5$</param>
    Sub ProcessOneWayEvent(ByVal properties As SPRemoteEventProperties) Implements IRemoteEventService.ProcessOneWayEvent
        Throw New NotImplementedException()
    End Sub
$else$    ''' <summary>
    ''' $loc_service_comment6$
    ''' </summary>
    ''' <param name="properties">$loc_service_comment7$</param>
    ''' <returns>$loc_service_comment8$</returns>
    Public Function ProcessEvent(ByVal properties As SPRemoteEventProperties) As SPRemoteEventResult Implements IRemoteEventService.ProcessEvent
        Dim result As New SPRemoteEventResult()

        Using clientContext As ClientContext = TokenHelper.CreateRemoteEventReceiverClientContext(properties)
            If clientContext IsNot Nothing Then
                clientContext.Load(clientContext.Web)
                clientContext.ExecuteQuery()
            End If
        End Using

        Return result
    End Function

    ''' <summary>
    ''' $loc_service_comment9$
    ''' </summary>
    ''' <param name="properties">$loc_service_comment10$</param>
    Sub ProcessOneWayEvent(ByVal properties As SPRemoteEventProperties) Implements IRemoteEventService.ProcessOneWayEvent
        Using clientContext As ClientContext = TokenHelper.CreateRemoteEventReceiverClientContext(properties)
            If clientContext IsNot Nothing Then
                clientContext.Load(clientContext.Web)
                clientContext.ExecuteQuery()
            End If
        End Using
    End Sub $endif$
End Class