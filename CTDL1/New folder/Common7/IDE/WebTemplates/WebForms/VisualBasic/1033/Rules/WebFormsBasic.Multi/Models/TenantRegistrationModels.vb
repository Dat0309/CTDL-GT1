Imports System.Collections.Generic
Imports System.Linq
Imports System.Web

Namespace Models
    Public Class Tenant
        Public Property Id() As String
            Get
                Return m_Id
            End Get
            Set
                m_Id = Value
            End Set
        End Property
        Private m_Id As String
    End Class

    Public Class SignupToken
        Public Property Id() As String
            Get
                Return m_Id
            End Get
            Set
                m_Id = Value
            End Set
        End Property
        Private m_Id As String

        Public Property ExpirationDate() As DateTimeOffset
            Get
                Return m_ExpirationDate
            End Get
            Set
                m_ExpirationDate = Value
            End Set
        End Property
        Private m_ExpirationDate As DateTimeOffset
    End Class

    Public Class IssuingAuthorityKey
        Public Property Id() As String
            Get
                Return m_Id
            End Get
            Set
                m_Id = Value
            End Set
        End Property
        Private m_Id As String
    End Class
End Namespace
