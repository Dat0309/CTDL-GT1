Imports System.Collections.Generic
Imports System.IdentityModel.Tokens
Imports System.Linq
Imports System.Runtime.CompilerServices
Imports System.Web
Imports System.Web.Hosting
Imports System.Xml.Linq
Imports $safeprojectname$.Models

Namespace Utils
    Public Class DatabaseIssuerNameRegistry
        Inherits ValidatingIssuerNameRegistry

        Public Shared Function ContainsTenant(tenantId As String) As Boolean
            Using context As New TenantDbContext()
                Return context.Tenants.Where(Function(tenant) tenant.Id = tenantId).Any()
            End Using
        End Function

        Public Shared Function ContainsKey(thumbprint As String) As Boolean
            Using context As New TenantDbContext()
                Return context.IssuingAuthorityKeys.Where(Function(key) key.Id = thumbprint).Any()
            End Using
        End Function

        Public Shared Sub RefreshKeys(metadataLocation As String)
            Dim issuingAuthority As IssuingAuthority = ValidatingIssuerNameRegistry.GetIssuingAuthority(metadataLocation)

            Dim newKeys As Boolean = False
            Dim refreshTenant As Boolean = False
            For Each thumbprint As String In issuingAuthority.Thumbprints
                If Not ContainsKey(thumbprint) Then
                    newKeys = True
                    refreshTenant = True
                    Exit For
                End If
            Next

            For Each issuer As String In issuingAuthority.Issuers
                If Not ContainsTenant(GetIssuerId(issuer)) Then
                    refreshTenant = True
                    Exit For
                End If
            Next

            If newKeys OrElse refreshTenant Then
                Using context As New TenantDbContext()
                    If newKeys Then
                        context.IssuingAuthorityKeys.RemoveRange(context.IssuingAuthorityKeys)
                        For Each thumbprint As String In issuingAuthority.Thumbprints
                            context.IssuingAuthorityKeys.Add(New IssuingAuthorityKey() With {
                                .Id = thumbprint
                            })
                        Next
                    End If
                    If refreshTenant Then
                        For Each issuer As String In issuingAuthority.Issuers
                            Dim issuerId As String = GetIssuerId(issuer)
                            If Not ContainsTenant(issuerId) Then
                                context.Tenants.Add(New Tenant() With {
                                    .Id = issuerId
                                })
                            End If

                        Next
                    End If
                    context.SaveChanges()
                End Using
            End If
        End Sub

        Private Shared Function GetIssuerId(issuer As String) As String
            Return issuer.TrimEnd("/"C).Split("/"C).Last()
        End Function

        Protected Overrides Function IsThumbprintValid(thumbprint As String, issuer As String) As Boolean
            Return ContainsTenant(GetIssuerId(issuer)) AndAlso ContainsKey(thumbprint)
        End Function
    End Class
End Namespace
