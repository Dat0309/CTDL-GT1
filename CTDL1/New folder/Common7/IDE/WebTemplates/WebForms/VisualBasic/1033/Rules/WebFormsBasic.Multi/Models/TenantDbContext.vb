Imports System.Collections.Generic
Imports System.Data.Entity
Imports System.Linq
Imports System.Web

Namespace Models
    Public Class TenantDbContext
        Inherits DbContext
        Public Sub New()
          MyBase.New("DefaultConnection")
        End Sub

        Public Property Tenants() As DbSet(Of Tenant)
            Get
                Return m_Tenants
            End Get
            Set
                m_Tenants = Value
            End Set
        End Property
        Private m_Tenants As DbSet(Of Tenant)

        Public Property IssuingAuthorityKeys() As DbSet(Of IssuingAuthorityKey)
            Get
                Return m_IssuingAuthorityKeys
            End Get
            Set
                m_IssuingAuthorityKeys = Value
            End Set
        End Property
        Private m_IssuingAuthorityKeys As DbSet(Of IssuingAuthorityKey)

        Public Property SignupTokens() As DbSet(Of SignupToken)
            Get
                Return m_SignupTokens
            End Get
            Set
                m_SignupTokens = Value
            End Set
        End Property
        Private m_SignupTokens As DbSet(Of SignupToken)
    End Class
End Namespace
