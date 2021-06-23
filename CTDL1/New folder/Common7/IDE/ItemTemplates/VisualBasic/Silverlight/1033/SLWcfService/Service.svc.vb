Imports System.ServiceModel
Imports System.ServiceModel.Activation

<ServiceContract(Namespace:="")>$if$ ($targetframeworkversion$ <= 3.5) _$endif$
<AspNetCompatibilityRequirements(RequirementsMode:=AspNetCompatibilityRequirementsMode.Allowed)>$if$ ($targetframeworkversion$ <= 3.5) _$endif$
Public Class $safeitemrootname$

    <OperationContract()>$if$ ($targetframeworkversion$ <= 3.5) _$endif$
    Public Sub DoWork()
        ' Add your operation implementation here
    End Sub

    ' Add more operations here and mark them with <OperationContract()>

End Class
