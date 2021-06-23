Imports System.Data.Entity

Public Class TenantDbContext
    Inherits DbContext
    Public Sub New()
        MyBase.New("DefaultConnection")
    End Sub

    Public Property Tenants As DbSet(Of Tenant)
    Public Property IssuingAuthorityKeys As DbSet(Of IssuingAuthorityKey)
    Public Property SignupTokens As DbSet(Of SignupToken)
End Class
