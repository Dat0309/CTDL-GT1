Imports System
Imports System.Collections.Generic
Imports System.Linq

Namespace Models
    Public Class UserProfile
        Public Property DisplayName() As String
            Get
                Return m_DisplayName
            End Get
            Set(value As String)
                m_DisplayName = value
            End Set
        End Property
        Private m_DisplayName As String
        Public Property GivenName() As String
            Get
                Return m_GivenName
            End Get
            Set(value As String)
                m_GivenName = value
            End Set
        End Property
        Private m_GivenName As String
        Public Property SurName() As String
            Get
                Return m_SurName
            End Get
            Set(value As String)
                m_SurName = value
            End Set
        End Property
        Private m_SurName As String
    End Class
End Namespace