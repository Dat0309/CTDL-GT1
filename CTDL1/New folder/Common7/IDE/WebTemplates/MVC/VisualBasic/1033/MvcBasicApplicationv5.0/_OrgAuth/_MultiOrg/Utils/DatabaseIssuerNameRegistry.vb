Imports System.IdentityModel.Tokens
Imports System.Runtime.CompilerServices
Imports System.Web
Imports System.Web.Hosting
Imports System.Xml.Linq

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
                        ' Add the default tenant to the registry. 
                        ' Comment or remove the following code if you do not wish to have the default tenant use the application.
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

        Public Shared Function TryAddTenant(tenantId As String, signupToken As String) As Boolean
            If Not ContainsTenant(tenantId) Then
                Using context As New TenantDbContext()
                  Dim existingToken As SignupToken = context.SignupTokens.Where(Function(token) token.Id = signupToken).FirstOrDefault()
                  If existingToken IsNot Nothing Then
                      context.SignupTokens.Remove(existingToken)
                      context.Tenants.Add(New Tenant() With {
                          .Id = tenantId
                      })
                      context.SaveChanges()
                      Return True
                  End If
                End Using
            End If

            Return False
        End Function

        Public Shared Sub AddSignupToken(signupToken As String, expirationTime As DateTimeOffset)
            Using context As New TenantDbContext()
                context.SignupTokens.Add(New SignupToken() With {
                    .Id = signupToken,
                    .ExpirationDate = expirationTime
                })
                context.SaveChanges()
            End Using
        End Sub

        Public Shared Sub CleanUpExpiredSignupTokens()
            Dim now As DateTimeOffset = DateTimeOffset.UtcNow
            Using context As New TenantDbContext()
                Dim tokensToRemove As IQueryable(Of SignupToken) = context.SignupTokens.Where(Function(token) token.ExpirationDate <= now)
                If tokensToRemove.Any() Then
                    context.SignupTokens.RemoveRange(tokensToRemove)
                    context.SaveChanges()
                End If
            End Using
        End Sub

        Private Shared Function GetIssuerId(issuer As String) As String
            Return issuer.TrimEnd("/"C).Split("/"C).Last()
        End Function

        Protected Overrides Function IsThumbprintValid(thumbprint As String, issuer As String) As Boolean
            Return ContainsTenant(GetIssuerId(issuer)) AndAlso ContainsKey(thumbprint)
        End Function
    End Class
End Namespace
