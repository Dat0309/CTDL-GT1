Imports System.Data.Services
Imports System.Data.Services.Common
Imports System.Linq
Imports System.ServiceModel.Web

Public Class $safeitemname$
    ' TODO: replace [[class name]] with your data class name
    Inherits DataService(Of [[class name]])

    ' This method is called only once to initialize service-wide policies.
    Public Shared Sub InitializeService(ByVal config As $dataserviceconfig$)
        ' TODO: set rules to indicate which entity sets and service operations are visible, updatable, etc.
        ' Examples:
        ' config.SetEntitySetAccessRule("MyEntityset", EntitySetRights.AllRead)
        ' config.SetServiceOperationAccessRule("MyServiceOperation", ServiceOperationRights.All)
        config.DataServiceBehavior.MaxProtocolVersion = DataServiceProtocolVersion.V3
    End Sub

End Class
