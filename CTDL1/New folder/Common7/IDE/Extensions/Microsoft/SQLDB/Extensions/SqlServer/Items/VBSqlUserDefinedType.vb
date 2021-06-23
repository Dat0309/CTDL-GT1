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
        ' $PutYourCodeHereComment$
        Return ""
    End Function

    Public ReadOnly Property IsNull() As Boolean Implements INullable.IsNull
        Get
            ' $PutYourCodeHereComment$
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
        ' $PutYourCodeHereComment$
        Return u
    End Function

    ' $PlaceholderMethodComment$
    Public Function Method1() As String
        ' $PutYourCodeHereComment$
        Return String.Empty
    End Function

    ' $PlaceholderStaticMethodComment$
    Public Shared Function Method2() As SqlString
        ' $PutYourCodeHereComment$
        Return New SqlString("")
    End Function

    ' $PlaceholderFieldComment$
    Public m_var1 As Integer

    ' $PrivateMemberComment$
    Private m_Null As Boolean
End Structure

