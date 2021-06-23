' $safeitemname$
Imports System.EnterpriseServices
Imports System

' The Transaction attribute makes your class transaction aware.  Your class can set the transactional type of your 
' object to one of the following:
' 
' Required
' Required New
' Supported
' Not Supported
' Disabled

<Transaction(TransactionOption.Supported)> _
Public Class $safeitemname$
    Inherits ServicedComponent

    ' Implement the methods of your class here.
    '
    ' Transactional components use the ContextUtil object to notify the caller as to whether or not
    ' they completed successfully.  If the transaction could succeed, the method should set
    ' ContextUtil.SetComplete.  If the transaction cannot succeed, the method should set
    ' ContextUtil.SetAbort.
    '
    ' Public Sub MySub()
    '    Try
    '        ' Code to do transactional work here.
    '        ' No errors.  Declare that the transaction can complete with SetComplete
    '        ContextUtil.SetComplete()
    '    Catch ex As Exception
    '        ' An exception was thrown while processing the transaction.  
    '        ' The transaction cannot complete and calls SetAbort.
    '        contextutil.SetAbort()
    '    End Try
    ' End Sub

    ' Instead of explicitly setting the ContextUtil state, methods in a transactional class can take the 
    ' AutoComplete attribute.  If the method returns successfully, SetComplete will be called.
    ' If the method throws an exception, SetAbort will be called.
    ' 
    ' <AutoComplete()> Public Sub MyMethod()
    ' End Sub

End Class
