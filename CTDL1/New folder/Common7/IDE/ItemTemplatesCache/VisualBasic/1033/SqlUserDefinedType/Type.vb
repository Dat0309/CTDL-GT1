Imports System
Imports System.Data
Imports System.Data.SqlClient
Imports System.Data.SqlTypes
Imports Microsoft.SqlServer.Server

<Serializable()> _
<Microsoft.SqlServer.Server.SqlUserDefinedType(Format.Native)> _
Public Structure $safeitemname$
    Implements INullable

    Public Overrides Function ToString() As String
        ' Put your code here
        Return ""
    End Function

    Public ReadOnly Property IsNull() As Boolean Implements INullable.IsNull
        Get
            ' Put your code here
            Return m_Null
        End Get
    End Property

    Public Shared ReadOnly Property Null As $safeitemname$
        Get
            Dim h As $safeitemname$ = New $safeitemname$
            h.m_Null = True
            Return h
        End Get
    End Property

    Public Shared Function Parse(ByVal s As SqlString) As $safeitemname$
        If s.IsNull Then
            Return Null
        End If

        Dim u As $safeitemname$ = New $safeitemname$
        ' Put your code here
        Return u
    End Function

    ' This is a place-holder method
    Public Function Method1() As String
        ' Put your code here
        Return "$IT_UDT_VB_Loc_1$"
    End Function

    ' This is a place-holder static method
    Public Shared Function Method2() As SqlString
        ' Put your code here
        Return New SqlString("$IT_UDT_VB_Loc_1$")
    End Function

    ' This is a place-holder field member
    Public m_var1 As Integer
    ' Private member
    Private m_Null As Boolean
End Structure

