Imports System.ServiceModel

' NOTE: You can use the "Rename" command on the context menu to change the interface name "$safeitemrootname$" in both code and config file together.
<ServiceContract()> _
Public Interface $safeitemrootname$

    <OperationContract()> _
    Function GetData(ByVal value As Integer) As String

End Interface
