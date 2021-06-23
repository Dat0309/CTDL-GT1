Imports System.Data.Entity

Public Class TenantDbContext
    Inherits DbContext
    Public Sub New()
        MyBase.New("DefaultConnection")
    End Sub

    Public Property IssuingAuthorityKeys As DbSet(Of IssuingAuthorityKey)

    Public Property Tenants As DbSet(Of Tenant)
End Class
