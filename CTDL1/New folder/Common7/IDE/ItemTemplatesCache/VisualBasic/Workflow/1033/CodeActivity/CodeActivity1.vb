Imports System.Activities

Public NotInheritable Class $safeitemname$
    Inherits CodeActivity
    
    'Define an activity input argument of type String
    Property Text() As InArgument(Of String)

    ' If your activity returns a value, derive from CodeActivity(Of TResult)
    ' and return the value from the Execute method.
    Protected Overrides Sub Execute(ByVal context As CodeActivityContext)
        'Obtain the runtime value of the Text input argument
        Dim text As String
        text = context.GetValue(Me.Text)
    End Sub
End Class
